import { Router } from "express";
import * as coursesController from "../controllers/courses.controller";

export const coursesRouter = Router();

// Registered before the generic list route for readability; no path conflict either way
// since there's no /courses/:id route to shadow.
coursesRouter.get("/courses/featured", coursesController.getFeaturedCourses);
coursesRouter.get("/courses", coursesController.listCourses);
coursesRouter.get("/lessons/:id", coursesController.getLessonById);
