import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";

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
