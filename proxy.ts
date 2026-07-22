import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

function isAuthorized(request: NextRequest): boolean {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isAdminPage = pathname.startsWith("/admin") && !isLoginPage;

  // Todo lo de /api/participants* y /api/push* es solo para el admin,
  // salvo el POST de creación en /api/participants (usado por el
  // formulario público), que queda libre.
  const isPublicSubmit = pathname === "/api/participants" && request.method === "POST";
  const isProtectedApi =
    (pathname.startsWith("/api/participants") || pathname.startsWith("/api/push")) &&
    !isPublicSubmit;

  if (!isAuthorized(request)) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (isProtectedApi) {
      return NextResponse.json({ error: "Autenticación requerida" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/participants",
    "/api/participants/:path*",
    "/api/push/:path*",
  ],
};
