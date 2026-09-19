import { z } from "zod";

export const createNoteSchema = z.object({
  content: z
    .string({ error: "Body must include a non-empty 'content' string" })
    .trim()
    .min(1, "Body must include a non-empty 'content' string"),
  lessonId: z.string().optional().nullable(),
  source: z.enum(["manual", "chat"], { error: "'source' must be 'manual' or 'chat'" }).optional(),
});
