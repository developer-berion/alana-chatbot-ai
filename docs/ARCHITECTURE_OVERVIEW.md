Objetivo
Definir la topología y límites del sistema alana-chatbot-ai.

Contexto
Ecosistema de viajes B2B con alta exigencia de precisión.

Alcance permitido
Integración Vertex AI, Dialogflow CX, Cloud Functions y WordPress.

Fuera de alcance (NO HACER)
No implementar persistencia local de PII en WordPress.

Reglas técnicas obligatorias

Aislamiento: El backend de GCP no debe confiar en el frontend de WordPress (Zero Trust).


Observabilidad: Cada transacción debe generar un TraceID único.

Validaciones requeridas
Prueba de latencia end-to-end < 2 segundos.