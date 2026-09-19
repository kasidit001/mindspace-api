import * as lessonService from "../../services/lesson.service";
import * as progressService from "../../services/progress.service";
import { NotFoundError } from "../../utils/errors";

export async function completeLesson(userId: string, lessonId: string) {
  const exists = await lessonService.lessonExists(lessonId);
  if (!exists) {
    throw new NotFoundError("Lesson not found");
  }

  return progressService.completeLesson(userId, lessonId);
}
