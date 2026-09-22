import {
  DataTypes,
  Model,
  type BelongsToManyAddAssociationMixin,
  type BelongsToManyGetAssociationsMixin,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type NonAttribute,
} from "sequelize";
import sequelize from "../config/database";
import type { Tag } from "./Tag";

export class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare id: CreationOptional<string>;
  declare title: string;
  declare slug: string;
  // Thai is an optional translation layered on English — API/frontend fall back to
  // English when descriptionTh is null. Same pattern as Lesson's title/content split.
  declare descriptionEn: string | null;
  declare descriptionTh: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Mixins for the Course.belongsToMany(Tag, { as: "tags" }) association declared
  // at the bottom of Tag.ts — typed here (unlike every other association in this
  // codebase, see CLAUDE.md's note on that pre-existing gap) since this one's new.
  declare tags?: NonAttribute<Tag[]>;
  declare addTag: BelongsToManyAddAssociationMixin<Tag, string>;
  declare getTags: BelongsToManyGetAssociationsMixin<Tag>;
}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descriptionEn: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description_en",
    },
    descriptionTh: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "description_th",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
  }
);

export default Course;
