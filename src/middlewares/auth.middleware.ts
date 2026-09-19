import type { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";
import * as authService from "../services/auth.service";
import { UnauthorizedError } from "../utils/errors";

export interface AuthedUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthedUser;
    }
  }
}

async function resolveUserFromHeader(req: Request): Promise<AuthedUser | null> {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;

  const decoded = authService.verifyToken(header.slice("Bearer ".length));
  if (!decoded) return null;

  const user = await userService.findByIdWithRole(decoded.userId);
  if (!user) return null;

  return { id: user.id, name: user.name, email: user.email, role: user.role!.name };
}

/** Rejects the request with 401 unless a valid session token identifies a user. */
export async function requireAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  const user = await resolveUserFromHeader(req);
  if (!user) {
    next(new UnauthorizedError("Missing or invalid Authorization token"));
    return;
  }
  req.user = user;
  next();
}

/** Attaches req.user if a valid token is present, but never rejects the request. */
export async function optionalAuth(req: Request, _res: Response, next: NextFunction): Promise<void> {
  req.user = (await resolveUserFromHeader(req)) ?? undefined;
  next();
}
