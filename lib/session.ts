// lib/session.ts

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Returns the authenticated user, or null if not logged in.
 * Use this in API route handlers so you can return a JSON 401
 * instead of a redirect.
 */
export async function getApiSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

/**
 * Page-level guard that redirects unauthenticated or unfinished
 * users through the onboarding funnel.
 */
export async function getSessionUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const user = session.user;

  if (!user.emailVerified) {
    redirect("/verify-email");
  }

  if (!user.username) {
    redirect("/onboarding/username");
  }

  if (!user.bio) {
    redirect("/onboarding/bio");
  }

  return user;
}
