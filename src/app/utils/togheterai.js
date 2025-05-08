// src/app/utils/togheterai.js
import Together from "together-ai";
import { SYSTEM_INSTRUCTIONS_FOOD_ANALYSIS } from "../constants/togheterai";

const together = new Together({
  apiKey: process.env.NEXT_PUBLIC_TOGETHER_API_KEY,
});

const defaultTask =
  "Analiza este plato de comida. Describe sus ingredientes y sus proporciones.";

/**
 * Envía una sola petición de análisis de imagen.
 * No conserva mensajes anteriores.
 *
 * @param {string} imageUrl - Data URL de la imagen a analizar.
 * @returns {AsyncGenerator<string>} - Stream de tokens de la respuesta.
 */
export async function analyzeFoodImage(imageUrl, task = defaultTask) {
  const response = await together.chat.completions.create({
    model: "meta-llama/Llama-Vision-Free",
    stream: true,
    messages: [
      {
        role: "system",
        content: SYSTEM_INSTRUCTIONS_FOOD_ANALYSIS,
      },
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: imageUrl } },
          { type: "text", text: task },
        ],
      },
    ],
  });

  async function* tokenStream() {
    for await (const token of response) {
      const delta = token.choices?.[0]?.delta?.content;
      if (delta) yield delta;
    }
  }

  return tokenStream();
}
