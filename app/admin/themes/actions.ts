"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";
import { PROFILE_TEMPLATES, ProfileTemplateId } from "@/lib/profileTemplates";

export async function updateCardTheme(themeId: CardThemeId) {
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

  if (user.username) {
    revalidatePath(`/${user.username}`, "page");
  }
}

export async function updateProfileTemplate(templateId: ProfileTemplateId) {
  if (!PROFILE_TEMPLATES[templateId]) {
    throw new Error("Invalid template");
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
    data: { profileTemplate: templateId },
  });

  if (user.username) {
    revalidatePath(`/${user.username}`, "page");
  }
}

export async function saveDesignPreferences({
  themeId,
  templateId,
}: {
  themeId: CardThemeId;
  templateId: ProfileTemplateId;
}) {
  if (!CARD_THEMES[themeId]) {
    throw new Error("Invalid theme");
  }
  if (!PROFILE_TEMPLATES[templateId]) {
    throw new Error("Invalid template");
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
    data: {
      cardTheme: themeId,
      profileTemplate: templateId,
    },
  });

  if (user.username) {
    revalidatePath(`/${user.username}`, "page");
  }

  return { success: true };
}
