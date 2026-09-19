export interface CreateNoteData {
  userId: string;
  content: string;
  lessonId: string | null;
  source: "manual" | "chat";
}

export interface CreateNoteInput {
  userId: string;
  content: string;
  lessonId?: string | null;
  source?: "manual" | "chat";
}
