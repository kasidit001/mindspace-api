import { Router } from "express";
import * as searchController from "../controllers/SearchController";

export const searchRouter = Router();

// GET /api/search?q=query — see SearchController.ts / search.repository.ts for the
// full-text search details (separate from the pgvector RAG retrieval used by chat).
searchRouter.get("/search", searchController.search);
