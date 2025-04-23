import { NextRequest, NextResponse } from "next/server";
// Middleware for disallowing access to certain routes based on authentication status
export function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  // Public routes that all users can view
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

  const token = request.cookies.get("token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", origin);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
