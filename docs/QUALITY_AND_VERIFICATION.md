Objetivo
Definir los "Quality Gates" que determinan si una feature está lista para el usuario final.

Contexto
Validación de comportamiento de IA y estabilidad de UI.

Reglas técnicas obligatorias
Grounding Test: El bot MUST fallar (declinar respuesta) si se le pregunta por una promoción cuya fecha en metadata es < TODAY.

UI Offset Test: El botón de chat MUST estar visible y no solaparse con el botón de WhatsApp a 1280px, 768px y 375px de ancho.

Latency Gate: El tiempo de respuesta del primer token SHOULD ser < 800ms.

Criterios de aceptación
100% de los leads llegan al correo info@alanatours.com.

El bot no menciona la palabra "descuento" si no hay un documento RAG que lo respalde.