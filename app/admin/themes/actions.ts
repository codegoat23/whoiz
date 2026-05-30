"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";

export async function updateCardTheme(themeId: CardThemeId) {
  // validate
  if (!CARD_THEMES[themeId]) {
    throw new Error("Invalid theme");
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const user = session.user;

  await prisma.user.update({
    where: { id: user.id },
    data: { cardTheme: themeId },
  });

  // revalidate public username page
  if (user.username) {
    revalidatePath(`/${user.username}`, "page");
  }
}
