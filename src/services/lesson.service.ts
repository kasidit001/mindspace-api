import * as lessonRepository from "../repositories/lesson.repository";

export function getLessonWithCourse(id: string) {
  return lessonRepository.findByIdWithCourse(id);
}

export async function lessonExists(id: string): Promise<boolean> {
  const lesson = await lessonRepository.findById(id);
  return lesson !== null;
}
