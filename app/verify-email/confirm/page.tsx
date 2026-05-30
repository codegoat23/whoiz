// app/verify-email/confirm/page.tsx
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";


export default async function VerifyEmailConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
   const params = await searchParams;
  const token = params.token;

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

  // Delete token (VERY IMPORTANT)
  await prisma.emailVerificationToken.delete({
    where: { token },
  });

  // Continue normal flow
  // after marking emailVerified = true and deleting token
redirect("/verify-email?verified=true");

}
