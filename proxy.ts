// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const { pathname } = request.nextUrl;

  // Public routes
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/verify-email",
  ];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Not logged in
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const user = session.user;

  // Deactivated account
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { deactivated: true },
  });

  if (dbUser?.deactivated) {
    return NextResponse.redirect(
      new URL("/auth/login?deactivated=1", request.url)
    );
  }

  // Email verification
  if (!user.emailVerified && pathname !== "/verify-email") {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  // Username onboarding
  if (!user.username && pathname !== "/onboarding/username") {
    return NextResponse.redirect(new URL("/onboarding/username", request.url));
  }

  // Bio onboarding
  if (
    user.username &&
    !user.bio &&
    pathname !== "/onboarding/bio"
  ) {
    return NextResponse.redirect(new URL("/onboarding/bio", request.url));
  }

  // Prevent revisiting completed onboarding
  if (
    pathname.startsWith("/onboarding") &&
    user.username &&
    user.bio
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Admin-only monitoring routes
  if (pathname.startsWith("/admin/monitoring")) {
    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || user.email.toLowerCase() !== adminEmail.toLowerCase()) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/onboarding/:path*",
  ],
};