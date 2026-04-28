// import { NextResponse } from "next/server";

// export function proxy(req) {
//   try {
//     const token = req.cookies.get("admin-auth")?.value;

//     const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

//     if (isAdminRoute && !token) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     // fallback safety: don't break the app if middleware fails
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
import { NextResponse } from "next/server";

export function proxy(req) {
  try {
    const token = req.cookies.get("admin-auth")?.value;

    const { pathname } = req.nextUrl;

    const isAdminRoute = pathname.startsWith("/admin");
    const isLoginRoute = pathname === "/login";

    // =========================
    // 1. BLOCK ADMIN IF NOT LOGGED IN
    // =========================
    if (isAdminRoute && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // =========================
    // 2. IF ALREADY LOGGED IN, BLOCK LOGIN PAGE
    // =========================
    if (isLoginRoute && token) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.next(); // safer fallback (don’t break app)
  }
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
