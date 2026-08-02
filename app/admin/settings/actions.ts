"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

export async function updateAccountInfo(data: {
  name: string;
  username: string;
}): Promise<{ success: boolean; error?: string }> {
  const user = await getApiSessionUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const name = data.name?.trim();
  const username = data.username?.trim().toLowerCase();

  if (!name) {
    return { success: false, error: "Name is required" };
  }

  if (!username || username.length < 3) {
    return { success: false, error: "Username must be at least 3 characters" };
  }

  if (!/^[a-z0-9_-]+$/.test(username)) {
    return {
      success: false,
      error: "Username can only contain letters, numbers, dashes and underscores",
    };
  }

  const existing = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (existing && existing.id !== user.id) {
    return { success: false, error: "Username is already taken" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { name, username },
  });

  return { success: true };
}

export async function changePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success: boolean; error?: string }> {
  const user = await getApiSessionUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!data.currentPassword || !data.newPassword) {
    return { success: false, error: "All fields are required" };
  }

  if (data.newPassword.length < 8) {
    return { success: false, error: "New password must be at least 8 characters" };
  }

  try {
    await auth.api.changePassword({
      body: {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions: true,
      },
      headers: await headers(),
    });

    return { success: true };
  } catch (error: any) {
    const message =
      error?.body?.message ?? error?.message ?? "Failed to change password";

    return { success: false, error: message };
  }
}

export async function deactivateAccount(): Promise<{
  success: boolean;
  error?: string;
}> {
  const user = await getApiSessionUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { deactivated: true },
  });

  // Revoke all sessions so the account is signed out everywhere.
  await prisma.session.deleteMany({
    where: { userId: user.id },
  });

  return { success: true };
}
