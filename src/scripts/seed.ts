import { connectDB } from "../config/database";
import { syncModels, Course, Lesson } from "../models";
import { embedAndStoreLesson } from "../services/embedding.service";
import { seedCourses } from "./seedContent";
import sequelize from "../config/database";

async function main() {
  await connectDB();
  await syncModels();

  const canEmbed = !!process.env.OPENAI_API_KEY;
  if (!canEmbed) {
    console.warn(
      "[seed] OPENAI_API_KEY not set — will seed courses/lessons but SKIP embedding generation."
    );
  }

  for (const courseSeed of seedCourses) {
    const [course] = await Course.findOrCreate({
      where: { slug: courseSeed.slug },
      defaults: {
        title: courseSeed.title,
        descriptionEn: courseSeed.descriptionEn,
        descriptionTh: courseSeed.descriptionTh ?? null,
      },
    });
    // Keep title/description in sync on re-runs.
    await course.update({
      title: courseSeed.title,
      descriptionEn: courseSeed.descriptionEn,
      descriptionTh: courseSeed.descriptionTh ?? null,
    });

    console.log(`[seed] Course: ${course.title}`);

    for (const lessonSeed of courseSeed.lessons) {
      const [lesson] = await Lesson.findOrCreate({
        where: { courseId: course.id, slug: lessonSeed.slug },
        defaults: {
          courseId: course.id,
          titleEn: lessonSeed.titleEn,
          titleTh: lessonSeed.titleTh ?? null,
          contentEn: lessonSeed.contentEn,
          contentTh: lessonSeed.contentTh ?? null,
          order: lessonSeed.order,
        },
      });
      await lesson.update({
        titleEn: lessonSeed.titleEn,
        titleTh: lessonSeed.titleTh ?? null,
        contentEn: lessonSeed.contentEn,
        contentTh: lessonSeed.contentTh ?? null,
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
