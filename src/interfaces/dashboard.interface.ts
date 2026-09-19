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
  lastAccessedAt: Date | null;
}

export interface DashboardRecommendation {
  courseId: string;
  reason: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  courses: DashboardCourseRow[];
  recommended: DashboardRecommendation[];
}
