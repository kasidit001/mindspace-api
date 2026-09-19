import { z } from "zod";

export const askQuestionSchema = z.object({
  question: z
    .string({ error: "Body must include a non-empty 'question' string" })
    .trim()
    .min(1, "Body must include a non-empty 'question' string"),
  stream: z.boolean().optional(),
});
