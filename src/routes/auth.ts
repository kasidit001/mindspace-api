import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const authRouter = Router();

authRouter.post("/auth/signup", authController.signup);
authRouter.post("/auth/login", authController.login);
authRouter.get("/auth/me", requireAuth, authController.me);
