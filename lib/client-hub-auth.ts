import { createHmac, timingSafeEqual } from "crypto";

export const CLIENT_HUB_COOKIE = "trustnova_client_hub";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

function secret() {
  return process.env.CLIENT_HUB_SESSION_SECRET || process.env.CLIENT_HUB_ACCESS_CODE || "";
}

export function createClientHubSession() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS;
  const payload = `client:${expiresAt}`;
  const signature = createHmac("sha256", secret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyClientHubSession(value?: string) {
  if (!value || !secret()) return false;
  const separator = value.lastIndexOf(".");
  if (separator < 1) return false;

  const payload = value.slice(0, separator);
  const given = value.slice(separator + 1);
  const expected = createHmac("sha256", secret()).update(payload).digest("base64url");
  if (given.length !== expected.length || !timingSafeEqual(Buffer.from(given), Buffer.from(expected))) {
    return false;
  }

  const [scope, expiresAt] = payload.split(":");
  return scope === "client" && Number(expiresAt) > Math.floor(Date.now() / 1000);
}

export { SESSION_DURATION_SECONDS };
