// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;

  // PUBLIC ROUTES (no auth required)
  const isAuthRoute =
    pathname.startsWith("/api/items/login") ||
    pathname.startsWith("/api/items/signup") ||
    pathname.startsWith("/api/items/logout") ||
    pathname.startsWith("/api/items/message");
  const isPublicPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico");

  if (isAuthRoute || isPublicPage) {
    return NextResponse.next();
  }

  // PROTECTED: require token cookie
  const token = request.cookies.get("token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", origin);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Apply to all routes except the ones above
  matcher: ["/((?!_next|favicon.ico).*)"],
};
