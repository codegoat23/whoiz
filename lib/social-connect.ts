import { prisma } from "@/lib/prisma";

export async function getSocials(userId: string) {
  return prisma.socialConnect.findMany({
    where: {
      userId,
    },
    select: {
      platform: true,
      url: true,
    },
  });
}