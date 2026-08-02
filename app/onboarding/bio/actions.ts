"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function updateBio(formData: FormData) {
  const bio = String(formData.get("bio") || "").trim();

  if (!bio || bio.length < 3) {
    throw new Error("Please add at least a few words for your bio.");
  }

  // 🔥 await cookies() here too
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

  await prisma.user.update({
    where: { id: session.user.id },
    data: { bio },
  });

  redirect("/admin");
}
