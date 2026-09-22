import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Course } from "./Course";

// Every lesson today is rendered the same way (Markdown via app/components/mdc/*
// in mindspace-web) — 'video'/'advlab'/'ctf' are real values the column (and a DB
// CHECK constraint, see the migration) already supports, but nothing sets them
// yet since those reader experiences don't exist. Keep in sync with the CHECK
// constraint in 20260920030000-add-content-type-to-lessons.cjs.
export type LessonContentType = "article" | "video" | "advlab" | "ctf";

// One "Code Lab" exercise. A lesson can carry several (see labs below) —
// each with its own starter code, test script, and an optional hint the
// learner can reveal at a cost (see mindspace-web's progress store /
// dashboard "Total points": revealing a hint deducts real, disclosed
// points from that same derived score, not a fabricated currency).
export interface LessonLab {
  id: string;
  title: string;
  instructions: string;
  starterCode: string;
  testCode: string;
  hint: string | null;
}

export class Lesson extends Model<InferAttributes<Lesson>, InferCreationAttributes<Lesson>> {
  declare id: CreationOptional<string>;
  declare courseId: ForeignKey<Course["id"]>;
  // English is required (the RAG chat/embeddings pipeline and full-text search — see
  // embeddings.ts and routes/search.ts — only read the *_en columns for now). Thai is
  // an optional translation layered on top; the API/frontend fall back to English when
  // a Thai field is null.
  declare titleEn: string;
  declare titleTh: string | null;
  declare slug: string;
  declare contentEn: string;
  declare contentTh: string | null;
  declare contentType: CreationOptional<LessonContentType>;
  // Code Lab exercises (see LessonLab above) — null/empty on the
  // (currently overwhelming majority of) lessons that have none yet.
  declare labs: LessonLab[] | null;
  declare order: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Lesson.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "course_id",
    },
    titleEn: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "title_en",
    },
    titleTh: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "title_th",
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentEn: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "content_en",
    },
    contentTh: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "content_th",
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "article",
      field: "content_type",
    },
    labs: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Lesson",
    tableName: "lessons",
    indexes: [{ unique: true, fields: ["course_id", "slug"] }],
  }
);

Course.hasMany(Lesson, { foreignKey: "courseId", as: "lessons" });
Lesson.belongsTo(Course, { foreignKey: "courseId", as: "course" });

export default Lesson;
