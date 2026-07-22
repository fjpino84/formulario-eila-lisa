import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "admin_session";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(username: string): string {
  const signature = sign(username);
  return `${username}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [username, signature] = token.split(".");
  if (!username || !signature) return false;
  if (username !== process.env.ADMIN_USER) return false;

  const expected = sign(username);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyCredentials(username: string, password: string): boolean {
  return username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD;
}
