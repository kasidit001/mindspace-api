import { Course, Lesson, Progress } from "../models";
import type { UpsertProgressData } from "../interfaces/progress.interface";

export async function upsertCompletion(data: UpsertProgressData) {
  const [progress] = await Progress.upsert(data);
  return progress;
}

export function findAllByUser(userId: string) {
  return Progress.findAll({
    where: { userId },
    include: [
      {
        model: Lesson,
        as: "lesson",
        attributes: ["id", "titleEn", "titleTh", "slug"],
        include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"] }],
      },
    ],
    order: [["completedAt", "DESC"]],
  });
}
