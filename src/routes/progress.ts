import { Router } from "express";
import * as progressController from "../controllers/progress.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const progressRouter = Router();

// POST /api/lessons/:id/complete — idempotent: marks a lesson complete for the
// authenticated user, or refreshes completedAt if it's already marked complete.
progressRouter.post("/lessons/:id/complete", requireAuth, progressController.completeLesson);

// GET /api/progress — the authenticated user's completed lessons, with lesson/course context.
progressRouter.get("/progress", requireAuth, progressController.listProgress);
