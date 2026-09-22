import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";
import { Course } from "./Course";
import { CourseTag } from "./CourseTag";

/**
 * A real, curated label attachable to courses (many-to-many, via the
 * `course_tags` join table — see the association declared at the bottom of
 * this file). Distinct from the title-regex tech-detection heuristic in
 * getDashboard.usecase.ts's getCourseTech(): that's a display-only guess for
 * dashboard recommendation diversity, this is real, explicit, queryable data.
 */
export class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare slug: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Tag.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
  }
);

Course.belongsToMany(Tag, { through: CourseTag, foreignKey: "courseId", otherKey: "tagId", as: "tags" });
Tag.belongsToMany(Course, { through: CourseTag, foreignKey: "tagId", otherKey: "courseId", as: "courses" });

export default Tag;
