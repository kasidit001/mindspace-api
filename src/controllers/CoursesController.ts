import type { Request, Response, NextFunction } from "express";
import { getFeaturedCourses as getFeaturedCoursesUseCase } from "../usecases/courses/GetFeaturedCoursesUseCase";
import { listCourses as listCoursesUseCase } from "../usecases/courses/ListCoursesUseCase";
import { getLessonById as getLessonByIdUseCase } from "../usecases/courses/GetLessonByIdUseCase";

export async function getFeaturedCourses(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await getFeaturedCoursesUseCase();
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

export async function listCourses(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const courses = await listCoursesUseCase(req.user?.role === "SYSTEM_ADMIN");
    res.json(courses);
  } catch (err) {
    next(err);
  }
}

export async function getLessonById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const lesson = await getLessonByIdUseCase(req.params.id!, req.user?.role === "SYSTEM_ADMIN");
    res.json(lesson);
  } catch (err) {
    next(err);
  }
}
