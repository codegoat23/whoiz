import { prisma } from "@/lib/prisma";
import { generateEmailVerificationToken } from "@/lib/tokens";

export async function createEmailVerificationToken(userId: string) {
  // 1️⃣ Delete old tokens (important)
  await prisma.emailVerificationToken.deleteMany({
    where: { userId },
  });

  // 2️⃣ Generate new token
  const token = generateEmailVerificationToken();

  // 3️⃣ Save token
  await prisma.emailVerificationToken.create({
    data: {
      userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });

  return token;
}
