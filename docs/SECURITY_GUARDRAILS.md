Objetivo
Protección de datos y prevención de abusos en el sistema de IA.

Contexto
Captura de PII (Información Personal Identificable).

Reglas técnicas obligatorias

Mínimo Privilegio: La Service Account de la Cloud Function solo tiene permisos de escritura en el log y ejecución de SMTP.

Sanitización: Validar formato de teléfono y correo antes de procesar el webhook.

Fuera de alcance (NO HACER)
No registrar teléfonos ni correos en las herramientas de monitoreo (Cloud Logging) en texto plano.