import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuthenticated = await getToken({ req });
    const isLoginPage = pathname.startsWith("/auth/login");

    const sensistiveRoutes = ["/dashboard"];
    const isAccessingSensitiveRoute = sensistiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isLoginPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuthenticated && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/", "/auth/login", "/dashboard/:path*"],
};
