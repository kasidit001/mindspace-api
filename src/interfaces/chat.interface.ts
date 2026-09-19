export interface AskResult {
  answer: string;
  references: Array<{
    lessonId: string;
    lessonTitle: string;
    lessonSlug: string;
    courseTitle: string;
  }>;
}

export type StreamEvent =
  | { type: "token"; token: string }
  | { type: "done"; references: AskResult["references"] };
