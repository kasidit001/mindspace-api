import sequelize from "../config/database";
import { EMBEDDING_DIM } from "../config/constants";
import { Course } from "./Course";
import { Lesson } from "./Lesson";
import { LessonEmbedding } from "./LessonEmbedding";
import { Progress } from "./Progress";
import { Note } from "./Note";
import { Role, ROLE_NAMES } from "./Role";
import { User } from "./User";
import { Tag } from "./Tag";
import { CourseTag } from "./CourseTag";

export { Course, Lesson, LessonEmbedding, Progress, Note, Role, User, Tag, CourseTag };

/**
 * Adds the pgvector `embedding` column + an HNSW cosine index to lesson_embeddings.
 * Raw SQL because Sequelize 6 has no native VECTOR type to declare on the model.
 * Must run after sequelize.sync() has created the table.
 */
async function ensureVectorColumn(): Promise<void> {
  await sequelize.query(
    `ALTER TABLE lesson_embeddings ADD COLUMN IF NOT EXISTS embedding VECTOR(${EMBEDDING_DIM});`
  );
  await sequelize.query(
    `CREATE INDEX IF NOT EXISTS lesson_embeddings_embedding_idx
       ON lesson_embeddings USING hnsw (embedding vector_cosine_ops);`
  );
}

/** Ensures the fixed role rows (SYSTEM_ADMIN, USER) exist — idempotent, safe to re-run. */
async function ensureRoles(): Promise<void> {
  for (const name of ROLE_NAMES) {
    await Role.findOrCreate({ where: { name } });
  }
}

export async function syncModels(): Promise<void> {
  await sequelize.sync();
  await ensureVectorColumn();
  await ensureRoles();
  console.log(
    "[db] Models synced (courses, lessons, lesson_embeddings, user_progress, notes, roles, users, tags, course_tags)."
  );
}
