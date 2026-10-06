import * as userService from "../../services/user.service";
import * as roleService from "../../services/role.service";
import * as authService from "../../services/auth.service";
import { ConflictError } from "../../utils/errors";
import type { SignupInput, AuthResult } from "../../interfaces/auth.interface";

export async function signup(input: SignupInput): Promise<AuthResult> {
  const normalizedEmail = input.email.trim().toLowerCase();

  const existing = await userService.findByEmail(normalizedEmail);
  if (existing) {
    throw new ConflictError("An account with this email already exists");
  }

  // Every signup gets the default USER role — SYSTEM_ADMIN is granted out of
  // band (directly in the DB), never through this public endpoint.
  const userRole = await roleService.findByName("USER");
  if (!userRole) throw new Error("USER role is not seeded — syncModels()/ensureRoles() must run first");

  const passwordHash = await authService.hashPassword(input.password);
  const user = await userService.createUser({
    name: input.name.trim(),
    email: normalizedEmail,
    passwordHash,
    roleId: userRole.id,
  });

  const token = authService.signToken(user.id);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: userRole.name } };
}
