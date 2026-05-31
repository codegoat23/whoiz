// app/verify-email/confirm/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function VerifyEmailConfirmPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tokenParam = searchParams?.token;

  // normalize token (string | string[] → string)
  const token = Array.isArray(tokenParam)
    ? tokenParam[0]
    : tokenParam;

  // No token → back to login
  if (!token) {
    redirect("/auth");
  }

  // Find token in DB
  const record = await prisma.emailVerificationToken.findUnique({
    where: { token },
  });

  // Invalid or expired token
  if (!record || record.expiresAt < new Date()) {
    redirect("/verify-email?error=expired");
  }

  // Mark user as verified
  await prisma.user.update({
    where: { id: record.userId },
    data: {
      emailVerified: true,
    },
  });

  // Delete token (important cleanup)
  await prisma.emailVerificationToken.delete({
    where: { token },
  });

  // Redirect success
  redirect("/verify-email?verified=true");

}