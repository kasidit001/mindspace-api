import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Course } from "./Course";

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
