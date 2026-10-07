import fs from "node:fs";
import path from "node:path";
import { connectDB } from "../config/database";
import { syncModels, Course, Lesson } from "../models";
import { embedAndStoreLesson } from "../services/embedding.service";
import * as tagService from "../services/tag.service";
import sequelize from "../config/database";
import type { SeedCourse } from "./seeders/types";

// Each course is its own file under ./seeders/ (one `export default SeedCourse`
// per file, named after the course slug) -- adding a course means creating a
// new seeder file there, not appending to a shared one. This mirrors how
// ./migrations/ works: this loader just reads the directory, same as
// migrate.ts does for migrations.
const SEEDERS_DIR = path.join(import.meta.dir, "seeders");

async function loadSeedCourses(): Promise<SeedCourse[]> {
  const files = fs
    .readdirSync(SEEDERS_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "types.ts")
    .sort();

  const courses: SeedCourse[] = [];
  for (const file of files) {
    const mod = await import(path.join(SEEDERS_DIR, file));
    courses.push(mod.default as SeedCourse);
  }
  return courses;
}

// Curated, not guessed — real tags per course, by slug. Distinct from the
// title-regex tech-detection heuristic in GetDashboardUseCase.ts's
// getCourseTech(), which exists only for that endpoint's display purposes;
// this is the actual queryable Tag data (see src/models/Tag.ts).
const COURSE_TAGS: Record<string, string[]> = {
  "typescript-for-js-programmers": ["TypeScript", "JavaScript"],
  "typescript-tooling": ["TypeScript"],
  "typescript-oop": ["TypeScript"],
  "docker-for-beginners": ["Docker"],
  "react-ui-patterns": ["React", "JavaScript"],
  "go-microservices": ["Go"],
  "claude-agent-skills": ["Claude", "AI Agents"],
  "nuxt-for-vue-developers": ["Nuxt", "Vue"],
  "claude-code-agent-harness": ["Claude", "AI Agents"],
};

async function main() {
  await connectDB();
  await syncModels();

  const canEmbed = !!process.env.OPENAI_API_KEY;
  if (!canEmbed) {
    console.warn(
      "[seed] OPENAI_API_KEY not set — will seed courses/lessons but SKIP embedding generation."
    );
  }

  const seedCourses = await loadSeedCourses();

  for (const courseSeed of seedCourses) {
    // Most seeders are finished catalog content and default published; a
    // course can opt into staying a draft via `published: false` (e.g. an
    // admin's own private reference material).
    const published = courseSeed.published ?? true;
    const [course] = await Course.findOrCreate({
      where: { slug: courseSeed.slug },
      defaults: {
        title: courseSeed.title,
        descriptionEn: courseSeed.descriptionEn,
        descriptionTh: courseSeed.descriptionTh ?? null,
        published,
      },
    });
    // Keep title/description in sync on re-runs.
    await course.update({
      title: courseSeed.title,
      descriptionEn: courseSeed.descriptionEn,
      descriptionTh: courseSeed.descriptionTh ?? null,
      published,
    });

    console.log(`[seed] Course: ${course.title}`);

    for (const tagName of COURSE_TAGS[courseSeed.slug] ?? []) {
      const tag = await tagService.findOrCreateByName(tagName);
      await tagService.attachToCourse(course.id, tag.id);
    }

    for (const lessonSeed of courseSeed.lessons) {
      const [lesson] = await Lesson.findOrCreate({
        where: { courseId: course.id, slug: lessonSeed.slug },
        defaults: {
          courseId: course.id,
          titleEn: lessonSeed.titleEn,
          titleTh: lessonSeed.titleTh ?? null,
          contentEn: lessonSeed.contentEn,
          contentTh: lessonSeed.contentTh ?? null,
          labs: lessonSeed.labs ?? null,
          sectionEn: lessonSeed.sectionEn ?? null,
          sectionTh: lessonSeed.sectionTh ?? null,
          order: lessonSeed.order,
        },
      });
      await lesson.update({
        titleEn: lessonSeed.titleEn,
        titleTh: lessonSeed.titleTh ?? null,
        contentEn: lessonSeed.contentEn,
        contentTh: lessonSeed.contentTh ?? null,
        labs: lessonSeed.labs ?? null,
        sectionEn: lessonSeed.sectionEn ?? null,
        sectionTh: lessonSeed.sectionTh ?? null,
        order: lessonSeed.order,
      });

      console.log(`  [seed] Lesson: ${lesson.titleEn}`);

      if (canEmbed) {
        // Re-embed from scratch so re-running the seed doesn't duplicate chunks.
        await sequelize.query("DELETE FROM lesson_embeddings WHERE lesson_id = :id", {
          replacements: { id: lesson.id },
        });
        const count = await embedAndStoreLesson(lesson);
        console.log(`    [seed] Embedded ${count} chunk(s).`);
      }
    }
  }

  console.log("[seed] Done.");
  await sequelize.close();
}

main().catch((err) => {
  console.error("[seed] Failed:", err);
  process.exit(1);
});
