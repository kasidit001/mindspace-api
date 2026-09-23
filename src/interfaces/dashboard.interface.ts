import type { LessonContentType } from "../models/Lesson";

export interface DashboardStats {
  totalLessons: number;
  completedLessons: number;
  completionPercent: number;
  currentStreakDays: number;
  coursesInProgress: number;
}

export interface DashboardCourseRow {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  nextLessonId: string | null;
  /** The next lesson's real content_type column (see Lesson model) — 'article' for
   * every lesson today, since video/lab reader experiences don't exist yet. */
  nextLessonContentType: LessonContentType | null;
  lastAccessedAt: Date | null;
}

export interface DashboardRecommendation {
  courseId: string;
  reason: string;
}

export interface DashboardBadge {
  id: string;
  title: string;
  description: string;
}

export interface DashboardNextBadge extends DashboardBadge {
  /** Real, computed from how far the user actually is from the threshold — never a fabricated tip. */
  hint: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  courses: DashboardCourseRow[];
  recommended: DashboardRecommendation[];
  /** The highest-tier badge earned so far (a proxy for "most recent" — there's no
   * per-badge earned-at timestamp to sort by, just the real underlying stats). */
  recentBadge: DashboardBadge | null;
  nextBadge: DashboardNextBadge | null;
}
