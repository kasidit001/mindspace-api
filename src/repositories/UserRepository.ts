import { User, Role } from "../models";
import type { CreateUserData } from "../interfaces/user.interface";

export function findByEmail(email: string) {
  return User.findOne({ where: { email } });
}

export function findByEmailWithRole(email: string) {
  return User.findOne({ where: { email }, include: [{ model: Role, as: "role" }] });
}

export function findByIdWithRole(id: string) {
  return User.findByPk(id, { include: [{ model: Role, as: "role" }] });
}

export function create(data: CreateUserData) {
  return User.create(data);
}
