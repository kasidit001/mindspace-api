import type { Request, Response, NextFunction } from "express";
import { searchLessons as searchLessonsUseCase } from "../usecases/search/searchLessons.usecase";
import { searchQuerySchema } from "../schemas/search.schema";
import { parse } from "../schemas/validate";

// GET /api/search?q=query — full-text keyword search over lesson title + content,
// for the Cmd+K spotlight search. This is plain Postgres full-text search, separate
// from the pgvector semantic search used by /api/chat/ask -- keyword search is what
// a "jump to this exact lesson" spotlight needs; RAG retrieval is for chat grounding.
export async function search(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { q } = parse(searchQuerySchema, { q: req.query.q });
    const results = await searchLessonsUseCase(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
}
