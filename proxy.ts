import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const pathname = request.nextUrl.pathname;

  const isCreateRoute = pathname.startsWith("/create");
  const isAdminRoute = pathname.startsWith("/dashboard");
  const isProtectedRoute = isCreateRoute || isAdminRoute;
  const isAuthRoute = pathname === "/login" || pathname === "/signup";

  if (!token) {
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
  try {
    const payload = verifyToken(token);
    const isAdmin = payload.role === "admin";
    if (isAuthRoute) {
      return NextResponse.redirect(
        new URL(
          payload.role === "admin" ? "/dashboard" : "/create",
          request.url,
        ),
      );
    }
    if (isAdminRoute && payload.role !== "admin") {
      return NextResponse.redirect(new URL("/create", request.url));
    }
    if (isCreateRoute && isAdmin) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Proxy authentication error:", error);

    const response = isProtectedRoute
      ? NextResponse.redirect(new URL("/login", request.url))
      : NextResponse.next();

    response.cookies.delete("access_token");

    return response;
  }
}

export const config = {
  matcher: ["/login", "/signup", "/create/:path*", "/dashboard/:path*"],
};
