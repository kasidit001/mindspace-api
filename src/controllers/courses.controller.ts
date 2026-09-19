import type { Request, Response, NextFunction } from "express";
import { getFeaturedCourses as getFeaturedCoursesUseCase } from "../usecases/courses/getFeaturedCourses.usecase";
import { listCourses as listCoursesUseCase } from "../usecases/courses/listCourses.usecase";
import { getLessonById as getLessonByIdUseCase } from "../usecases/courses/getLessonById.usecase";

// GET /api/courses/featured — course overview + lesson counts, for the landing-page hero.
export async function getFeaturedCourses(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await getFeaturedCoursesUseCase();
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

// GET /api/courses
export async function listCourses(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await listCoursesUseCase();
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

// GET /api/lessons/:id
export async function getLessonById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lesson = await getLessonByIdUseCase(req.params.id!);
    res.json(lesson);
  } catch (err) {
    next(err);
  }
}
