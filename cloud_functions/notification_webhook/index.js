const functions = require('@google-cloud/functions-framework');
const nodemailer = require('nodemailer');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

/**
 * HTTP Cloud Function to send email notifications.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('sendNotification', async (req, res) => {
  // 1. FINANCIAL KILL SWITCH CHECK
  // If the env var KILL_SWITCH_ACTIVE is 'true', we immediately return an error
  // to prevent further resource usage/costs (though invocation cost applies, execution is minimal).
  if (process.env.KILL_SWITCH_ACTIVE === 'true') {
    console.error('KILL SWITCH ACTIVATED: Service suspended.');
    return res.status(503).json({
      error: 'Service suspended due to budget constraints.',
      status: 'suspended'
    });
  }

  // 2. Validate Request Method
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { Nombre, Agencia, Teléfono, Correo } = req.body;

    if (!Nombre || !Agencia || !Teléfono || !Correo) {
      return res.status(400).json({ error: 'Missing required fields: Nombre, Agencia, Teléfono, Correo' });
    }

    console.log(`Processing lead: ${Nombre} from ${Agencia}`);

    // 3. SMTP Configuration
    // In production, these should come from Secret Manager mounted as env vars
    // or retrieved via Node client. For this bootstrap, we assume Env Vars.
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER || 'info@alanatours.com',
        pass: process.env.SMTP_PASS // Ensure this is set securely!
      }
    });

    // 4. Send Email
    const mailOptions = {
      from: '"Alana Chatbot AI" <info@alanatours.com>',
      to: 'info@alanatours.com', // or the lead's email if configured
      subject: `Nuevo Lead: ${Nombre} - ${Agencia}`,
      text: `Has recibido un nuevo lead desde el chatbot AI.\n\nNombre: ${Nombre}\nAgencia: ${Agencia}\nTeléfono: ${Teléfono}\nCorreo: ${Correo}\n`,
      html: `
        <h3>Nuevo Lead Capturado</h3>
        <ul>
            <li><strong>Nombre:</strong> ${Nombre}</li>
            <li><strong>Agencia:</strong> ${Agencia}</li>
            <li><strong>Teléfono:</strong> ${Teléfono}</li>
            <li><strong>Correo:</strong> ${Correo}</li>
        </ul>
        <p><em>Enviado por Alana Architecture Engine</em></p>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);

    // 5. Success Response
    return res.status(200).json({
      message: 'Notification sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error processing notification:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      details: error.message
    });
  }
});
