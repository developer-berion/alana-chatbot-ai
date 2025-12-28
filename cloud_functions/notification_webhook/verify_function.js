const proxyquire = require('proxyquire');
const assert = require('assert');

console.log('--- STARTING VERIFICATION SUITE ---\n');

// 1. MOCK Setup
const nodemailerMock = {
    createTransport: (config) => {
        console.log('[Mock] Creating Transport with config:', JSON.stringify(config, null, 2));
        return {
            sendMail: async (options) => {
                console.log('[Mock] Sending Mail options:', JSON.stringify(options, null, 2));
                return { messageId: 'mock-id-123' };
            }
        };
    }
};

const functionsMock = {
    http: (name, handler) => {
        console.log(`[Mock] Registered function: ${name}`);
        // Expose handler for testing
        module.exports.handler = handler;
    }
};

// 2. Load Function with Mocks
// We proxyquire the index.js file. 
// Note: We need to point to the file relative to THIS script.
const myFunc = proxyquire('./index', {
    'nodemailer': nodemailerMock,
    '@google-cloud/functions-framework': functionsMock
});

// Since our mock registers the handler to module.exports.handler immediately upon require:
const sendNotification = module.exports.handler;

// 3. Test Runners
async function runTest(name, req, expectedStatus, expectedBodyPart) {
    console.log(`\nTEST: ${name}`);

    let status = 200;
    let responseBody = {};

    const res = {
        status: (s) => {
            status = s;
            return {
                json: (b) => { responseBody = b; console.log(`[Response ${s}] JSON:`, b); return res; },
                send: (b) => { responseBody = b; console.log(`[Response ${s}] SEND:`, b); return res; }
            };
        }
    };

    try {
        await sendNotification(req, res);

        if (status !== expectedStatus) {
            console.error(`FAILED: Expected status ${expectedStatus}, got ${status}`);
        } else {
            console.log('STATUS CHECK: PASS');
        }

        if (expectedBodyPart) {
            const bodyStr = JSON.stringify(responseBody);
            if (bodyStr.includes(expectedBodyPart)) {
                console.log('BODY CHECK: PASS');
            } else {
                console.error(`FAILED: Body did not include '${expectedBodyPart}'. Got: ${bodyStr}`);
            }
        }

    } catch (e) {
        console.error('EXCEPTION:', e);
    }
}

// 4. Execution
(async () => {
    // Test A: Kill Switch Active
    process.env.KILL_SWITCH_ACTIVE = 'true';
    await runTest('Kill Switch Activation', { method: 'POST', body: {} }, 503, 'suspended');

    // Test B: Validation Error
    process.env.KILL_SWITCH_ACTIVE = 'false';
    await runTest('Validation Error (Missing Fields)', { method: 'POST', body: { Nombre: 'Juan' } }, 400, 'Missing required fields');

    // Test C: Success Path
    await runTest('Successfull Email Send', {
        method: 'POST',
        body: {
            Nombre: 'Victor',
            Agencia: 'Berion',
            Teléfono: '+123456789',
            Correo: 'test@example.com'
        }
    }, 200, 'mock-id-123');

})();
