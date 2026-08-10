import { z } from "zod";

export const generateSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(5, "Prompt must be at least 5 characters")
    .max(2000, "Prompt cannot exceed 2000 characters"),

  type: z.enum(["image", "video"]),

  model: z.string().min(1, "Model is required"),

  ratio: z.enum(["16:9", "1:1", "9:16", "4:3"]),
});
