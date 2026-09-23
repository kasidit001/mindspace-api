import { DataTypes, Model, type CreationOptional, type ForeignKey, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import type { Course } from "./Course";
import type { Tag } from "./Tag";

/**
 * The `course_tags` many-to-many join table, as an explicit model rather than
 * a bare string passed to `belongsToMany`'s `through` — needed so its columns
 * get the same snake_case `field:` mapping every other FK in this schema
 * uses (courseId -> course_id, tagId -> tag_id), matching the migration in
 * src/db/migrations/20260922160847-create-tags.cjs exactly. No repository of
 * its own — always accessed through Course.tags / Tag.courses associations.
 */
export class CourseTag extends Model<InferAttributes<CourseTag>, InferCreationAttributes<CourseTag>> {
  declare id: CreationOptional<string>;
  declare courseId: ForeignKey<Course["id"]>;
  declare tagId: ForeignKey<Tag["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

CourseTag.init(
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
    tagId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: "tag_id",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "CourseTag",
    tableName: "course_tags",
    indexes: [{ unique: true, fields: ["course_id", "tag_id"] }],
  }
);

export default CourseTag;
