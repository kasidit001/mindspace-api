import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Lesson } from "./Lesson";

/**
 * NOTE: the `embedding` column (VECTOR(1536)) is intentionally NOT declared as a
 * Sequelize attribute — Sequelize 6 has no native pgvector type. It's added via a
 * raw ALTER TABLE in ensureVectorColumn() (see src/models/index.ts) and read/written
 * with raw SQL in src/services/embeddings.ts.
 */
export class LessonEmbedding extends Model<InferAttributes<LessonEmbedding>, InferCreationAttributes<LessonEmbedding>> {
  declare id: CreationOptional<string>;
  declare lessonId: ForeignKey<Lesson["id"]>;
  declare chunkIndex: number;
  declare content: string;
  declare model: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

LessonEmbedding.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "lesson_id",
    },
    chunkIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "chunk_index",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "LessonEmbedding",
    tableName: "lesson_embeddings",
  }
);

Lesson.hasMany(LessonEmbedding, { foreignKey: "lessonId", as: "embeddings" });
LessonEmbedding.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

export default LessonEmbedding;
