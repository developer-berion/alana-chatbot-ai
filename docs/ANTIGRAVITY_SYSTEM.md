Objetivo
Gobernar el comportamiento de ejecución del agente Antigravity para el proyecto Alana AI.

Contexto
Entorno de desarrollo agéntico sobre Google Cloud.

Alcance permitido
Planificación de tareas, modificación de código, ejecución de comandos en terminal de GCP.

Fuera de alcance (NO HACER)
No tomar decisiones arquitectónicas sin aprobación del contrato .md correspondiente. No usar librerías externas no listadas en el PRD.

Inputs disponibles
PRD Alana AI, Notebooks de Arquitectura Corporativa.

Reglas técnicas obligatorias
MUST usar Strict Grounding.


MUST citar la fuente del RAG en cada respuesta técnica.

Pasos de ejecución
Leer arquitectura. 2. Generar plan de implementación. 3. Esperar aprobación humana.

Validaciones requeridas
Verificación de sintaxis de metadata en archivos RAG.

Criterios de aceptación
Cero alucinaciones detectadas en pruebas de caja negra.

Condiciones de parada / escalamiento
Si una instrucción es ambigua, detener ejecución y preguntar al Architect.