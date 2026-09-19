import * as lessonService from "../../services/lesson.service";
import { NotFoundError } from "../../utils/errors";

export async function getLessonById(id: string) {
  const lesson = await lessonService.getLessonWithCourse(id);
  if (!lesson) {
    throw new NotFoundError("Lesson not found");
  }
  return lesson;
}
