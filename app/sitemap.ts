import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // Dynamic user profile pages
  const users = await prisma.user.findMany({
    where: {
      username: { not: null },
      emailVerified: true,
      deactivated: false,
    },
    select: {
      username: true,
      updatedAt: true,
    },
  });

  const userPages: MetadataRoute.Sitemap = users.map((user) => ({
    url: `${BASE_URL}/${user.username}`,
    lastModified: user.updatedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic showcase pages (published only)
  const showcases = await prisma.showcase.findMany({
    where: {
      action: "Publish",
      owner: {
        username: { not: null },
        emailVerified: true,
        deactivated: false,
      },
    },
    select: {
      id: true,
      createdAt: true,
      owner: {
        select: {
          username: true,
        },
      },
    },
  });

  const showcasePages: MetadataRoute.Sitemap = showcases.map((showcase) => ({
    url: `${BASE_URL}/${showcase.owner.username}/showcases/${showcase.id}`,
    lastModified: showcase.createdAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...userPages, ...showcasePages];
}
