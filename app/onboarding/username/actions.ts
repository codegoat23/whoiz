"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateUsername(formData: FormData) {
  const username = String(formData.get("username") || "").trim();

  if (!username || username.length < 3) {
    throw new Error("Username must be at least 3 characters.");
  }

  // 🔥 await cookies() here
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const session = await auth.api.getSession({
    headers: {
      cookie: cookieHeader,
    },
  });

  if (!session) {
    redirect("/auth/login");
  }

  // optional: ensure unique username
  const existing = await prisma.user.findUnique({
    where: { username },
  });

  if (existing) {
    throw new Error("Username is already taken.");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username },
  });

  redirect("/onboarding/bio");
}
