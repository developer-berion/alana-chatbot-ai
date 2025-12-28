Objetivo
Definir la comunicación entre Dialogflow y el sistema de notificaciones.

Contexto
Webhook para procesamiento de leads y consultas RAG.

Reglas técnicas obligatorias

Idempotencia: Requerir Idempotency-Key en el cuerpo del JSON.


Manejo de Errores: Responder con RFC 7807 en caso de fallo del SMTP.

Criterios de aceptación
Manejo correcto de reintentos automáticos ante error 503 del servidor SMTP.