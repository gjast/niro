import { createHmac, timingSafeEqual } from "crypto";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD is not set");
  return secret;
}

export function getSessionToken(): string {
  return createHmac("sha256", getSecret()).update("admin-session").digest("hex");
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || typeof token !== "string") return false;
  try {
    const expected = getSessionToken();
    if (token.length !== expected.length) return false;
    return timingSafeEqual(Buffer.from(token, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export function getSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    value: getSessionToken(),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE_NAME;
}
