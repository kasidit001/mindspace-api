import * as courseService from "../../services/course.service";
import * as progressService from "../../services/progress.service";
import type { Course } from "../../models/Course";
import type { Lesson } from "../../models/Lesson";
import type { Progress } from "../../models/Progress";
import type {
  DashboardBadge,
  DashboardCourseRow,
  DashboardNextBadge,
  DashboardRecommendation,
  DashboardResponse,
} from "../../interfaces/dashboard.interface";

// findAllWithLessons()/findAllByUser() attach these via Sequelize associations, which
// aren't part of the models' own declared attributes (see Course/Lesson/Progress.ts) —
// narrowed to just the fields each repository query actually selects.
type CourseWithLessons = Pick<Course, "id" | "title"> & {
  lessons: Array<Pick<Lesson, "id" | "order" | "contentType">>;
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

// Real, disclosed title-keyword heuristic — same idea as courseLevel.ts on the
// frontend, and kept in sync with mindspace-web's ~/utils/courseTech.ts
// getCourseTech so a course's detected "tech" here matches the logo the
// frontend actually renders for it.
type TechId = "ts" | "js" | "python" | "node" | "go" | "docker" | "react" | "vue";

const TECH_HINTS: Array<{ id: TechId; pattern: RegExp }> = [
  { id: "ts", pattern: /\btypescript\b/i },
  { id: "js", pattern: /\bjavascript\b/i },
  { id: "python", pattern: /\bpython\b/i },
  { id: "go", pattern: /\bgo(lang)?\b/i },
  { id: "docker", pattern: /\bdocker\b/i },
  { id: "react", pattern: /\breact\b/i },
  { id: "vue", pattern: /\b(vue|nuxt)\b/i },
  { id: "node", pattern: /\bnode(\.js)?\b/i },
];

function getCourseTech(title: string): TechId {
  for (const hint of TECH_HINTS) {
    if (hint.pattern.test(title)) return hint.id;
  }
  return "ts";
}

/** Only not-started courses are ever recommended — anything the user has completed
 * even one lesson of (in-progress OR fully completed) is "already taking"/"already
 * taken" and belongs in `courses`/the Continue Learning surface, never here. Picks
 * across distinct detected techs before repeating one, so three not-started
 * TypeScript courses don't crowd out Docker/React/Go in the slice below — no
 * fabricated personalization signal, just real course data reordered for breadth.
 * If there are fewer than MAX_RECOMMENDATIONS not-started courses left, this simply
 * returns fewer — it must never backfill with an active/completed course, since
 * that's exactly what caused a course to show in both Continue Learning and here. */
function buildRecommendations(courses: DashboardCourseRow[]): DashboardRecommendation[] {
  const notStarted = courses.filter((c) => c.totalLessons > 0 && c.completedLessons === 0);

  const seenTech = new Set<TechId>();
  const firstOfEachTech: DashboardCourseRow[] = [];
  const remainder: DashboardCourseRow[] = [];
  for (const course of notStarted) {
    const tech = getCourseTech(course.title);
    if (seenTech.has(tech)) {
      remainder.push(course);
    } else {
      seenTech.add(tech);
      firstOfEachTech.push(course);
    }
  }
  const diversifiedNotStarted = [...firstOfEachTech, ...remainder];

  return diversifiedNotStarted
    .map((c) => ({ courseId: c.id, reason: "Not started yet" }))
    .slice(0, MAX_RECOMMENDATIONS);
}

// Badge catalog, ordered easiest-to-hardest. There's no exams/quiz concept (or any
// dedicated badges/achievements table) anywhere in this API yet — rather than
// fabricate one, every badge is a threshold on stats we already compute for real
// from Progress rows, so nothing here can drift from what the learner actually did.
// Keep this catalog in sync with mindspace-web's app/utils/badges.ts, which mirrors
// it client-side until the frontend consumes this endpoint directly (Phase B).
type BadgeMetric = "lessonsCompleted" | "streakDays" | "coursesCompleted";

interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  metric: BadgeMetric;
  threshold: number;
}

const BADGE_CATALOG: BadgeDefinition[] = [
  { id: "first-lesson", title: "First Lesson", description: "Complete your first lesson", metric: "lessonsCompleted", threshold: 1 },
  { id: "getting-started", title: "Getting Started", description: "Complete 5 lessons", metric: "lessonsCompleted", threshold: 5 },
  { id: "three-day-streak", title: "3-Day Streak", description: "Study 3 days in a row", metric: "streakDays", threshold: 3 },
  { id: "dedicated-learner", title: "Dedicated Learner", description: "Complete 10 lessons", metric: "lessonsCompleted", threshold: 10 },
  { id: "course-champion", title: "Course Champion", description: "Finish a full course", metric: "coursesCompleted", threshold: 1 },
  { id: "week-streak", title: "Week-Long Streak", description: "Study 7 days in a row", metric: "streakDays", threshold: 7 },
];

interface BadgeContext {
  lessonsCompleted: number;
  streakDays: number;
  coursesCompleted: number;
}

function buildBadgeHint(def: BadgeDefinition, current: number): string {
  if (def.metric === "streakDays") return `Reach a ${def.threshold}-day streak to unlock`;
  const remaining = Math.max(def.threshold - current, 1);
  const noun = def.metric === "coursesCompleted" ? "course" : "lesson";
  return `Complete ${remaining} more ${noun}${remaining === 1 ? "" : "s"} to unlock`;
}

/** The highest-tier badge the user has earned (recentBadge — see the interface
 * comment) and the very next one they haven't, with a real, computed hint. */
function getBadges(ctx: BadgeContext): { recentBadge: DashboardBadge | null; nextBadge: DashboardNextBadge | null } {
  let recentBadge: DashboardBadge | null = null;
  let nextBadge: DashboardNextBadge | null = null;

  for (const def of BADGE_CATALOG) {
    const value = ctx[def.metric];
    if (value >= def.threshold) {
      recentBadge = { id: def.id, title: def.title, description: def.description };
    } else if (!nextBadge) {
      nextBadge = { id: def.id, title: def.title, description: def.description, hint: buildBadgeHint(def, value) };
    }
  }

  return { recentBadge, nextBadge };
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
      nextLessonContentType: nextLesson?.contentType ?? null,
      lastAccessedAt,
    };
  });

  const totalLessons = courseRows.reduce((sum, c) => sum + c.totalLessons, 0);
  const completedLessons = courseRows.reduce((sum, c) => sum + c.completedLessons, 0);
  const coursesInProgress = courseRows.filter((c) => c.completedLessons > 0 && c.completedLessons < c.totalLessons).length;
  const coursesCompleted = courseRows.filter((c) => c.totalLessons > 0 && c.completedLessons === c.totalLessons).length;
  const currentStreakDays = calculateStreak(progress.map((p) => p.completedAt));

  const { recentBadge, nextBadge } = getBadges({ lessonsCompleted: completedLessons, streakDays: currentStreakDays, coursesCompleted });

  return {
    stats: {
      totalLessons,
      completedLessons,
      completionPercent: percent(completedLessons, totalLessons),
      currentStreakDays,
      coursesInProgress,
    },
    courses: courseRows,
    recommended: buildRecommendations(courseRows),
    recentBadge,
    nextBadge,
  };
}
