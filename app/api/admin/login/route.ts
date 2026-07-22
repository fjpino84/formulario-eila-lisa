import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, verifyCredentials, SESSION_COOKIE } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<{ username: string; password: string }>;

  if (!body.username || !body.password || !verifyCredentials(body.username, body.password)) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(body.username), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
