import { Router } from "express";
import * as searchController from "../controllers/search.controller";

export const searchRouter = Router();

// GET /api/search?q=query — see search.controller.ts / search.repository.ts for the
// full-text search details (separate from the pgvector RAG retrieval used by chat).
searchRouter.get("/search", searchController.search);
