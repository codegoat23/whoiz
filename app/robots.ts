import type { MetadataRoute } from "next";

const BASE_URL = process.env.APP_URL || "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/auth/",
          "/onboarding/",
          "/api/",
          "/forgot-password",
          "/reset-password",
          "/verify-email",
          "/test",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
