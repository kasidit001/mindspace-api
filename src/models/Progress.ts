import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Lesson } from "./Lesson";
import { User } from "./User";

/**
 * Tracks lesson completion per account. One row per (user, lesson); unique on
 * that pair so POST /api/lessons/:id/complete is a safe upsert scoped to the
 * authenticated user (see src/middlewares/auth.middleware.ts requireAuth).
 */
export class Progress extends Model<InferAttributes<Progress>, InferCreationAttributes<Progress>> {
  declare id: CreationOptional<string>;
  declare userId: ForeignKey<User["id"]>;
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id",
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "lesson_id",
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
    indexes: [{ unique: true, fields: ["user_id", "lesson_id"] }],
  }
);

Lesson.hasMany(Progress, { foreignKey: "lessonId", as: "progress" });
Progress.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });
User.hasMany(Progress, { foreignKey: "userId", as: "progress" });
Progress.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Progress;
