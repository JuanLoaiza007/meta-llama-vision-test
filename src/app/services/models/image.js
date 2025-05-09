import { z } from "zod";

export const modelName = "images";

export const ImageSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  dataUrl: z.string().url({ message: "Debe ser una URL válida (base64)" }),
  createdAt: z.string(),
});
