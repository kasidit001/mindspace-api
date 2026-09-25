import { Router } from "express";
import { optionalAuth } from "../middlewares/auth.middleware";
import * as coursesController from "../controllers/courses.controller";

export const coursesRouter = Router();

// Registered before the generic list route for readability; no path conflict either way
// since there's no /courses/:id route to shadow.
coursesRouter.get("/courses/featured", coursesController.getFeaturedCourses);
// optionalAuth: both routes stay publicly readable, but populate req.user when a
// valid session is present so a SYSTEM_ADMIN can also see their own draft courses.
coursesRouter.get("/courses", optionalAuth, coursesController.listCourses);
coursesRouter.get("/lessons/:id", optionalAuth, coursesController.getLessonById);
