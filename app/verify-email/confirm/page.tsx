import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/tokens";
import { redirect } from "next/navigation";

export default async function VerifyEmailConfirmPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const tokenParam = searchParams?.token;

  const token = Array.isArray(tokenParam)
    ? tokenParam[0]
    : tokenParam;

  if (!token) {
    redirect("/verify-email?error=missing");
  }

  // Hash the incoming token and look up by hash
  const hashedToken = hashToken(token);

  const record = await prisma.emailVerificationToken.findUnique({
    where: { token: hashedToken },
  });

  if (!record) {
    redirect("/verify-email?error=invalid");
  }

  if (record.expiresAt < new Date()) {
    // Delete the expired token
    await prisma.emailVerificationToken.delete({
      where: { token: hashedToken },
    });
    redirect("/verify-email?error=expired");
  }

  // Mark user as verified
  await prisma.user.update({
    where: { id: record.userId },
    data: { emailVerified: true },
  });

  // Delete the used token
  await prisma.emailVerificationToken.delete({
    where: { token: hashedToken },
  });

  redirect("/verify-email?verified=true");
}
