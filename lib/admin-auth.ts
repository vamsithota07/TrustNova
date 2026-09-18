import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE = "trustnova_admin_desk";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

function secret() {
  return process.env.TRUSTNOVA_ADMIN_SESSION_SECRET || process.env.TRUSTNOVA_ADMIN_ACCESS_CODE || "";
}

export function createAdminSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `admin:${expiresAt}`;
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyAdminSession(value?: string) {
  if (!value || !secret()) return false;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return false;
  const payload = value.slice(0, separator);
  const actual = value.slice(separator + 1);
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  if (actual.length !== expected.length || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) return false;
  const [scope, expiresAt] = payload.split(":");
  return scope === "admin" && Number(expiresAt) > Math.floor(Date.now() / 1000);
}

export { SESSION_DURATION_SECONDS };
