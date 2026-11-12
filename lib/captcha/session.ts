import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";

export const CAPTCHA_COOKIE_NAME = "captcha_session";
const TTL_SECONDS = 60 * 60; // 1 hour

function getSecret(): string | null {
  const s =
    process.env.CAPTCHA_SESSION_SECRET ??
    process.env.RECAPTCHA_SECRET_KEY ??
    null;
  return s && s.length > 0 ? s : null;
}

export function createCaptchaSession(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expiry = Math.floor(Date.now() / 1000) + TTL_SECONDS;
  const payload = `v1.${expiry}`;
  const sig = createHmac("sha256", secret).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyCaptchaSession(value: string | undefined): boolean {
  if (!value) return false;
  const parts = value.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return false;
  const expiry = Number(parts[1]);
  if (!Number.isFinite(expiry)) return false;
  if (expiry < Math.floor(Date.now() / 1000)) return false;
  const secret = getSecret();
  if (!secret) return false;
  const expected = createHmac("sha256", secret)
    .update(`v1.${expiry}`)
    .digest("hex");
  const got = parts[2];
  if (got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(got, "hex"), Buffer.from(expected, "hex"));
}

export function captchaCookieOptions() {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: TTL_SECONDS,
  };
}
