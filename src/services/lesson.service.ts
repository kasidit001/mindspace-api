import * as lessonRepository from "../repositories/lesson.repository";

export function getLessonWithCourse(id: string) {
  return lessonRepository.findByIdWithCourse(id);
}

// Routes through the course-joined lookup (not the plain findById) so a lesson
// belonging to an unpublished draft course can't be marked complete either —
// same "doesn't exist yet" treatment as viewing it directly.
export async function lessonExists(id: string): Promise<boolean> {
  const lesson = await lessonRepository.findByIdWithCourse(id);
  return lesson !== null;
}
