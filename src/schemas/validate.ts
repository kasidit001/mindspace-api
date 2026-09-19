import type { ZodType } from "zod";
import { BadRequestError } from "../utils/errors";

/**
 * Parses `data` against `schema`, or throws a BadRequestError carrying the first
 * validation issue's message. Controllers call this right after destructuring
 * req.body/query/params — never inside a UseCase (that's business-rule territory).
 */
export function parse<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new BadRequestError(result.error.issues[0]?.message ?? "Invalid request");
  }
  return result.data;
}
