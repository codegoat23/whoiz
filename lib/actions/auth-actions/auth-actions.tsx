"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { sendVerificationEmail } from "@/lib/emailVerification";

const USERNAME_REGEX = /^[a-z0-9_-]+$/;

function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "");
}

export const signIn = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { deactivated: true },
  });

  if (user?.deactivated) {
    throw new Error("This account has been deactivated.");
  }

  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
  return result;
};

export const signUp = async (
  email: string,
  password: string,
  name: string,
  username?: string
) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  // Save username if provided (validated client-side, re-validated here)
  if (result?.user?.id && username) {
    const normalized = normalizeUsername(username);

    if (
      normalized.length >= 3 &&
      normalized.length <= 20 &&
      USERNAME_REGEX.test(normalized)
    ) {
      const existing = await prisma.user.findUnique({
        where: { username: normalized },
        select: { id: true },
      });

      if (!existing) {
        await prisma.user.update({
          where: { id: result.user.id },
          data: { username: normalized },
        });
      }
    }
  }

  // Send verification email after successful signup
  if (result?.user?.id) {
    try {
      await sendVerificationEmail(result.user.id, email);
    } catch (err) {
      console.error("Failed to send verification email:", err);
      // Don't fail signup if email sending fails — user can resend manually
    }
  }

  return result;
};

export const signOut = async () => {
  const result = await auth.api.signOut({ headers: await headers() });
};
