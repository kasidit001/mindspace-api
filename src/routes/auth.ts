import { Router } from "express";
import { User, Role } from "../models";
import { hashPassword, verifyPassword, signToken, requireAuth } from "../utils/auth";
import { BadRequestError, ConflictError, UnauthorizedError } from "../utils/errors";

export const authRouter = Router();

function toPublicUser(user: User, roleName: string) {
  return { id: user.id, name: user.name, email: user.email, role: roleName };
}

// POST /api/auth/signup  { name: string, email: string, password: string }
authRouter.post("/auth/signup", async (req, res, next) => {
  const { name, email, password } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    next(new BadRequestError("Body must include a non-empty 'name' string"));
    return;
  }
  if (typeof email !== "string" || !email.trim()) {
    next(new BadRequestError("Body must include a non-empty 'email' string"));
    return;
  }
  if (typeof password !== "string" || password.length < 6) {
    next(new BadRequestError("'password' must be a string of at least 6 characters"));
    return;
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ where: { email: normalizedEmail } });
    if (existing) {
      next(new ConflictError("An account with this email already exists"));
      return;
    }

    // Every signup gets the default USER role — SYSTEM_ADMIN is granted out of
    // band (directly in the DB), never through this public endpoint.
    const userRole = await Role.findOne({ where: { name: "USER" } });
    if (!userRole) throw new Error("USER role is not seeded — syncModels()/ensureRoles() must run first");

    const passwordHash = await hashPassword(password);
    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      roleId: userRole.id,
    });

    const token = signToken(user.id);
    res.status(201).json({ token, user: toPublicUser(user, userRole.name) });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/login  { email: string, password: string }
authRouter.post("/auth/login", async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    next(new BadRequestError("Body must include 'email' and 'password' strings"));
    return;
  }

  try {
    const user = await User.findOne({
      where: { email: email.trim().toLowerCase() },
      include: [{ model: Role, as: "role" }],
    });

    // Same error for "no such user" and "wrong password" — don't leak which
    // one it was, that's an account-enumeration oracle.
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      next(new UnauthorizedError("Invalid email or password"));
      return;
    }

    const token = signToken(user.id);
    res.json({ token, user: toPublicUser(user, user.role!.name) });
  } catch (err) {
    next(err);
  }
});

// GET /api/auth/me — returns the caller's own account for a valid session token.
authRouter.get("/auth/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});
