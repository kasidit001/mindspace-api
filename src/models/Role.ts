import { DataTypes, Model, type CreationOptional, type InferAttributes, type InferCreationAttributes } from "sequelize";
import sequelize from "../config/database";

/** Fixed role names — kept as a union so callers can't pass an arbitrary string. */
export type RoleName = "SYSTEM_ADMIN" | "USER";

export const ROLE_NAMES: readonly RoleName[] = ["SYSTEM_ADMIN", "USER"];

/**
 * Lookup table for account roles. Rows are seeded (see syncModels) rather than
 * hardcoded as a Postgres ENUM column, so a future role can be added with a
 * plain INSERT instead of an ALTER TYPE migration.
 */
export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<string>;
  declare name: RoleName;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Role.init(
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
  }
);

export default Role;
