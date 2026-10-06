export interface SeedLesson {
  slug: string;
  titleEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  titleTh?: string;
  order: number;
  contentEn: string;
  /** Thai translation. Optional — lessons without one fall back to English (see Lesson model). */
  contentTh?: string;
  /**
   * Code Lab exercises (see mindspace-web's CodeLab.vue) — a lesson can
   * carry several. Each `testCode` runs after the learner's `starterCode`
   * in a sandboxed Web Worker; it calls the injected `check(actual,
   * expected, label)` for each assertion. `hint`, if set, costs real
   * points to reveal (see mindspace-web's progress store) — not shown for
   * free. Most lessons have no labs at all.
   */
  labs?: SeedLab[];
}

export interface SeedLab {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  testCode: string;
  hint?: string;
}

export interface SeedCourse {
  slug: string;
  title: string;
  descriptionEn: string;
  /** Thai translation. Optional — courses without one fall back to English (see Course model). */
  descriptionTh?: string;
  /**
   * Defaults to true (published) when omitted — every course seeded here is
   * normally finished catalog content. Set false for a draft only meant for
   * an admin's own reference, not the public catalog (see Course model's
   * `published` column).
   */
  published?: boolean;
  lessons: SeedLesson[];
}
