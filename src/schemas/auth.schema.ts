import { z } from "zod";

export const signupSchema = z.object({
  name: z
    .string({ error: "Body must include a non-empty 'name' string" })
    .trim()
    .min(1, "Body must include a non-empty 'name' string"),
  email: z
    .string({ error: "Body must include a non-empty 'email' string" })
    .trim()
    .min(1, "Body must include a non-empty 'email' string"),
  password: z
    .string({ error: "'password' must be a string of at least 6 characters" })
    .min(6, "'password' must be a string of at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string({ error: "Body must include 'email' and 'password' strings" }),
  password: z.string({ error: "Body must include 'email' and 'password' strings" }),
});
