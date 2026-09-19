import * as noteService from "../../services/note.service";

export function listNotes(userId: string, lessonId?: string) {
  return noteService.listNotes(userId, lessonId);
}
