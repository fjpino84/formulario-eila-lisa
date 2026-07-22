import { NextRequest, NextResponse } from "next/server";

const REALM = "Admin";

function isAuthorized(request: NextRequest): boolean {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Basic ")) return false;

  const decoded = Buffer.from(header.slice(6), "base64").toString("utf-8");
  const separatorIndex = decoded.indexOf(":");
  if (separatorIndex === -1) return false;

  const user = decoded.slice(0, separatorIndex);
  const pass = decoded.slice(separatorIndex + 1);

  return (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASSWORD
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // El listado GET de participantes también es solo para el admin;
  // el POST de creación (usado por el formulario público) queda libre.
  const isProtectedApi =
    (pathname === "/api/participants" && request.method === "GET") ||
    (pathname.startsWith("/api/participants/") && request.method === "DELETE");
  const isAdminPage = pathname.startsWith("/admin");

  if ((isAdminPage || isProtectedApi) && !isAuthorized(request)) {
    return new NextResponse("Autenticación requerida", {
      status: 401,
      headers: { "WWW-Authenticate": `Basic realm="${REALM}"` },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/participants", "/api/participants/:path*"],
};
