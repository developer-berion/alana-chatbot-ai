Objetivo
Establecer la estructura de datos para el RAG Híbrido y la captura de leads.

Contexto
Vertex AI Search (Data Store) y almacenamiento temporal de leads.

Alcance permitido
Definición de esquemas JSON, metadatos de Markdown y tipos de datos para Cloud Functions.

Fuera de alcance (NO HACER)
No diseñar bases de datos relacionales complejas (SQL) si no es estrictamente necesario para la fase 1.

Inputs disponibles
PRD (Sección 1: Estrategia de Contenido).

Reglas técnicas obligatorias
Metadata Strict: Todo archivo .md en el Data Store MUST tener los campos: ID, Validez (ISO 8601), Link (HTTPS).

Lead Schema: El objeto Lead MUST contener: timestamp, nombre, agencia, contacto, resumen_ia, sentimiento.

Validaciones requeridas
Validación de esquema JSON antes de la ingesta en Vertex AI.