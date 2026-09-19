import * as courseService from "../../services/course.service";
import * as progressService from "../../services/progress.service";
import type { Course } from "../../models/Course";
import type { Lesson } from "../../models/Lesson";
import type { Progress } from "../../models/Progress";
import type { DashboardCourseRow, DashboardRecommendation, DashboardResponse } from "../../interfaces/dashboard.interface";

// findAllWithLessons()/findAllByUser() attach these via Sequelize associations, which
// aren't part of the models' own declared attributes (see Course/Lesson/Progress.ts) —
// narrowed to just the fields each repository query actually selects.
type CourseWithLessons = Pick<Course, "id" | "title"> & {
  lessons: Array<Pick<Lesson, "id" | "order">>;
};
type ProgressWithLessonId = Pick<Progress, "lessonId" | "completedAt">;

const DAY_MS = 24 * 60 * 60 * 1000;
const MAX_RECOMMENDATIONS = 3;

/** Consecutive-day count ending today or yesterday — a gap of exactly one day still
 * counts as "current" so the streak doesn't reset before the user studies today. */
function calculateStreak(completedAtDates: Date[]): number {
  if (completedAtDates.length === 0) return 0;

  const uniqueDays = Array.from(new Set(completedAtDates.map((d) => Math.floor(d.getTime() / DAY_MS)))).sort(
    (a, b) => b - a
  );

  const today = Math.floor(Date.now() / DAY_MS);
  const mostRecent = uniqueDays[0]!;
  if (mostRecent !== today && mostRecent !== today - 1) return 0;

  let streak = 0;
  let expected = mostRecent;
  for (const day of uniqueDays) {
    if (day === expected) {
      streak++;
      expected--;
    } else if (day < expected) {
      break;
    }
  }
  return streak;
}

function percent(completed: number, total: number): number {
  return total === 0 ? 0 : Math.round((completed / total) * 100);
}

/** Not-started courses first (clearest gap), then in-progress ones — no fabricated
 * personalization signal, just what's honestly derivable from real progress data. */
function buildRecommendations(courses: DashboardCourseRow[]): DashboardRecommendation[] {
  const notStarted = courses.filter((c) => c.totalLessons > 0 && c.completedLessons === 0);
  const inProgress = courses.filter((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons);

  return [
    ...notStarted.map((c) => ({ courseId: c.id, reason: "Not started yet" })),
    ...inProgress.map((c) => ({ courseId: c.id, reason: "Continue where you left off" })),
  ].slice(0, MAX_RECOMMENDATIONS);
}

export async function getDashboard(userId: string): Promise<DashboardResponse> {
  const [courses, progress] = await Promise.all([
    courseService.listCourses() as unknown as Promise<CourseWithLessons[]>,
    progressService.listProgress(userId) as unknown as Promise<ProgressWithLessonId[]>,
  ]);

  const completedAtByLessonId = new Map<string, Date>();
  for (const row of progress) {
    completedAtByLessonId.set(row.lessonId, row.completedAt);
  }

  const courseRows: DashboardCourseRow[] = courses.map((course) => {
    const lessons = [...course.lessons].sort((a, b) => a.order - b.order);
    const completedLessons = lessons.filter((l) => completedAtByLessonId.has(l.id));
    const nextLesson = lessons.find((l) => !completedAtByLessonId.has(l.id));
    const lastAccessedAt = completedLessons.reduce<Date | null>((latest, l) => {
      const completedAt = completedAtByLessonId.get(l.id)!;
      return !latest || completedAt > latest ? completedAt : latest;
    }, null);

    return {
      id: course.id,
      title: course.title,
      totalLessons: lessons.length,
      completedLessons: completedLessons.length,
      progressPercent: percent(completedLessons.length, lessons.length),
      nextLessonId: nextLesson?.id ?? null,
      lastAccessedAt,
    };
  });

  const totalLessons = courseRows.reduce((sum, c) => sum + c.totalLessons, 0);
  const completedLessons = courseRows.reduce((sum, c) => sum + c.completedLessons, 0);
  const coursesInProgress = courseRows.filter((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons).length;

  return {
    stats: {
      totalLessons,
      completedLessons,
      completionPercent: percent(completedLessons, totalLessons),
      currentStreakDays: calculateStreak(progress.map((p) => p.completedAt)),
      coursesInProgress,
    },
    courses: courseRows,
    recommended: buildRecommendations(courseRows),
  };
}
