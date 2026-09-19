import { createHmac, timingSafeEqual } from "node:crypto";

const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
  // Fail loudly rather than silently signing tokens with a guessable default —
  // an auth secret that's the same across every install is a real vulnerability,
  // not just a dev inconvenience.
  throw new Error("SESSION_SECRET env var is required (used to sign auth session tokens).");
}

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

function base64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

/**
 * Minimal signed session token — not a full JWT, just the same idea (a
 * base64url payload + an HMAC-SHA256 signature) sized for this API's needs.
 * Avoids pulling in a JWT library for a single first-party client.
 */
export function signToken(userId: string): string {
  const payload = JSON.stringify({ sub: userId, exp: Date.now() + TOKEN_TTL_SECONDS * 1000 });
  const encodedPayload = base64url(payload);
  const signature = createHmac("sha256", SESSION_SECRET!).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyToken(token: string): { userId: string } | null {
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = createHmac("sha256", SESSION_SECRET!).update(encodedPayload).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expectedSignature);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (typeof payload.sub !== "string" || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return { userId: payload.sub };
  } catch {
    return null;
  }
}

export function hashPassword(password: string): Promise<string> {
  // Bun's built-in password hashing — argon2id by default, no extra dependency.
  return Bun.password.hash(password);
}

export function verifyPassword(password: string, hash: string): Promise<boolean> {
  return Bun.password.verify(password, hash);
}
