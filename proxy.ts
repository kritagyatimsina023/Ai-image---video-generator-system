import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;
  console.log("IS pathname", pathname);

  const isProtectedRoute =
    pathname.startsWith("/create") || pathname.startsWith("/dashboard");

  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  if (token) {
    try {
      verifyToken(token);

      if (isAuthRoute) {
        return NextResponse.redirect(new URL("/create", request.url));
      }

      return NextResponse.next();
    } catch {
      const response = isProtectedRoute
        ? NextResponse.redirect(new URL("/login", request.url))
        : NextResponse.next();

      response.cookies.delete("access_token");
      return response;
    }
  }

  if (isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/create/:path*", "/dashboard/:path*"],
};
