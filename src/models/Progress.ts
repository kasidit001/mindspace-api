import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Lesson } from "./Lesson";

/**
 * Single-user app (no auth/user table exists anywhere in the codebase yet) — this
 * tracks lesson completion globally, not per-account. One row per completed lesson;
 * unique on lessonId so POST /api/lessons/:id/complete is a safe upsert.
 */
export class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>> {
  declare id: CreationOptional<string>;
  declare lessonId: ForeignKey<Lesson["id"]>;
  declare completed: CreationOptional<boolean>;
  declare completedAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Progress.init(
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
      unique: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "completed_at",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Progress",
    tableName: "user_progress",
  }
);

Lesson.hasOne(Progress, { foreignKey: "lessonId", as: "progress" });
Progress.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

export default Progress;
