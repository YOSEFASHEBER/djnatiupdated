import { NextResponse } from "next/server";

export function proxy(req) {
  try {
    const token = req.cookies.get("admin-auth")?.value;

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    // fallback safety: don't break the app if middleware fails
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
