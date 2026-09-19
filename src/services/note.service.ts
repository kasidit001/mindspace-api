import * as noteRepository from "../repositories/note.repository";
import type { CreateNoteData } from "../interfaces/note.interface";

export function createNote(data: CreateNoteData) {
  return noteRepository.create(data);
}

export function listNotes(userId: string, lessonId?: string) {
  return noteRepository.findAllByUser(userId, lessonId);
}
