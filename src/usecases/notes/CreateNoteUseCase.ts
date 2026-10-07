import * as noteService from "../../services/note.service";
import * as lessonService from "../../services/lesson.service";
import { NotFoundError } from "../../utils/errors";
import type { CreateNoteInput } from "../../interfaces/note.interface";

export async function createNote(input: CreateNoteInput) {
  if (input.lessonId !== undefined && input.lessonId !== null) {
    const exists = await lessonService.lessonExists(input.lessonId);
    if (!exists) {
      throw new NotFoundError("Lesson not found");
    }
  }

  return noteService.createNote({
    userId: input.userId,
    content: input.content.trim(),
    lessonId: input.lessonId ?? null,
    source: input.source ?? "manual",
  });
}
