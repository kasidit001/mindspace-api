import { Router } from "express";
import * as dashboardController from "../controllers/dashboard.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const dashboardRouter = Router();

// GET /api/dashboard — aggregated stats, per-course progress, and streak for the
// authenticated user's Learning Dashboard.
dashboardRouter.get("/dashboard", requireAuth, dashboardController.getDashboard);
