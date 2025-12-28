Objetivo
Gobernar el ciclo de vida del código desde el IDE (Antigravity) hasta la producción en Alana Tours.

Contexto
Entorno WordPress (Hostinger) + GCP (Cloud Functions).

Alcance permitido
Scripts de despliegue, configuración de secretos y variables de entorno.

Reglas técnicas obligatorias
Secret Management: MUST NOT hardcodear credenciales SMTP. Usar Secret Manager en GCP.

Rollback: Todo despliegue de Cloud Function MUST mantener la versión anterior activa durante 5 minutos para reversión inmediata en caso de fallo 5xx.

WordPress Safety: El script del widget debe cargarse de forma asíncrona (async/defer) para no bloquear el LCP (Largest Contentful Paint) del sitio.

Pasos de ejecución
Test unitario de lógica de filtrado de fechas. 2. Despliegue en Staging. 3. Validación de UAT. 4. Promo a Producción.