import { z } from "zod";

export const searchQuerySchema = z.object({
  q: z
    .string({ error: "Query parameter 'q' is required" })
    .trim()
    .min(1, "Query parameter 'q' is required"),
});
