import { Lesson, Note } from "../models";
import type { CreateNoteData } from "../interfaces/note.interface";

export function create(data: CreateNoteData) {
  return Note.create(data);
}

export function findAllByUser(userId: string, lessonId?: string) {
  return Note.findAll({
    where: {
      userId,
      ...(lessonId ? { lessonId } : {}),
    },
    include: [{ model: Lesson, as: "lesson", attributes: ["id", "titleEn", "titleTh", "slug"] }],
    order: [["createdAt", "DESC"]],
  });
}
