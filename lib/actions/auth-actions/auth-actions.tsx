"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { sendVerificationEmail } from "@/lib/emailVerification";

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
      callbackURL: "/",
    },
  });
  return result;
};

export const signUp = async (email: string, password: string, name: string) => {
  const result = await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
      callbackURL: "/",
    },
  });

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
