import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === "ADMIN";
    const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");

    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard");
        const isLoginRoute = req.nextUrl.pathname.startsWith("/login");
        const isAdminInitRoute = req.nextUrl.pathname.startsWith("/admin-init");

        // Allow access to login and admin-init pages
        if (isLoginRoute || isAdminInitRoute) {
          return true;
        }

        // For admin routes, require authentication
        if (isAdminRoute) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/admin-init"],
};

