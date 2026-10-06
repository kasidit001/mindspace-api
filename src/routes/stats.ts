import { Router } from "express";
import * as statsController from "../controllers/StatsController";

export const statsRouter = Router();

// GET /api/stats — landing-page hero numbers.
statsRouter.get("/stats", statsController.getStats);
