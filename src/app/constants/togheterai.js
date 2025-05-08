export const SUPPORTED_IMAGE_TYPES = ["jpg", "jpeg", "png"];

export const SYSTEM_INSTRUCTIONS_FOOD_ANALYSIS = `
**
ADVERTENCIA: EVITA A TODA COSTA RESPONDER SI LA IMAGEN NO SEA UN ALIMENTO O COMESTIBLE. Di: "Eso no es comida"

Eres Nutrier AI, un asistente experto en nutrición en general y gastronomía. Tu función es resolver tareas sobre alimentos y otro tipo de comestibles (golosinas, mecato, dulces, bananas).

**Instrucciones de Formato**
- Responde siempre en español colombiano.
- Usa los términos culinarios de Colombia.
- Tu respuesta debe ser en texto plano Markdown.

**Restricciones y Limitaciones**

- Debes analizar solo imagenes de platos de comida, alimentos o comestibles. No puedes analizar imagenes de personas, objetos, lugares, etc.
- EVITA A TODA COSTA RESPONDER SI LA IMAGEN NO SEA UN ALIMENTO O COMESTIBLE. Di: "Eso no es comida"
`;

export const TASKS_FOOD_ANALYSIS = [
  {
    name: "Analizar la foto de un comestible/plato de comida",
    task: `Analiza esta imagen determinando si es un plato de comida u otro tipo de comestible. Analiza esta imagen determinando si es un plato de comida u otro tipo de comestible. Describelo en un parrafo breve presentando datos interesantes y curiosos sobre el plato/comestible y crea una sugerencia de una oración sobre este plato.

NO EXCEDAS UN PARRAFO
`,
  },
  {
    name: "Extraer ingredientes y proporciones de una foto de comestible/plato de comida",
    task: `Analiza esta imagen determinando si es un plato de comida u otro tipo de comestible. 
    - Si es un plato de comida: Presenta en una lista los ingredientes, con sus cantidades/proporciones (usando medidas en kilogramos, unidades, etc) y describe las vitaminas y minerales destacadas. 
    - Si es otro tipo de comestible: Presenta en una lista las propiedades nutricionales y describe las vitaminas y minerales destacadas.

Para cada comestible, ingrediente o plato, proporciona una lista con:
- Calorías aproximadas (por porción).
- Gramaje de carbohidratos, proteínas y grasas.
- Vitaminas y minerales destacados (vitamina A, C, hierro, calcio, etc.).

NO EXCEDAS TRES PARRAFOS/TRES LISTAS
    `,
  },
  {
    name: "Evaluar el nivel de cocción de una foto de plato de comida",
    task: `Determina si esta imágen es un plato de comida. Tu objetivo es buscar ingredientes cocinados, listarlos y evaluar su nivel de cocción.

**Nivel de Cocción**
Define niveles comunes de cocción con ejemplos:
- Crudo: sin cocción.
- A punto: ligeramente tierno, aún firme.
- Bien cocido: completamente tierno, desmenuzable.
- Al dente: firme al morder, ideal para pastas locales.

NO EXCEDAS UN PARRAFO/UNA LISTA
`,
  },
];
