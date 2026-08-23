import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Lesson } from "./Lesson";

/** Where a note's content came from — a manually written note, or a saved AI chat answer. */
export type NoteSource = "manual" | "chat";

export class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
  declare id: CreationOptional<string>;
  declare lessonId: ForeignKey<Lesson["id"]> | null;
  declare content: string;
  declare source: CreationOptional<NoteSource>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Note.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    // Nullable: a saved chat answer may not be tied to a single lesson.
    lessonId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "lesson_id",
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source: {
      type: DataTypes.ENUM("manual", "chat"),
      allowNull: false,
      defaultValue: "manual",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Note",
    tableName: "notes",
  }
);

Lesson.hasMany(Note, { foreignKey: "lessonId", as: "notes" });
Note.belongsTo(Lesson, { foreignKey: "lessonId", as: "lesson" });

export default Note;
