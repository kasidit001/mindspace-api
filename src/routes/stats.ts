import { Router } from "express";
import * as statsController from "../controllers/stats.controller";

export const statsRouter = Router();

// GET /api/stats — landing-page hero numbers.
statsRouter.get("/stats", statsController.getStats);
