import * as progressRepository from "../repositories/progress.repository";

/** Idempotent: marks a lesson complete for the user, or refreshes completedAt if already marked. */
export function completeLesson(userId: string, lessonId: string) {
  return progressRepository.upsertCompletion({
    userId,
    lessonId,
    completed: true,
    completedAt: new Date(),
  });
}

export function listProgress(userId: string) {
  return progressRepository.findAllByUser(userId);
}
