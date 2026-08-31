import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";
import ProfileViewTracker from "./ProfileViewTracker";
import TemplateRenderer from "@/components/profile-templates/TemplateRenderer";

// 🔹 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username?: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { username },
    select: { name: true, bio: true, deactivated: true },
  });

  if (!user) {
    return { title: "User Not Found" };
  }

  if (user.deactivated) {
    return { title: "Account Deactivated" };
  }

  return {
    title: `${user.name} | ${user.bio ?? ""}`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username?: string }>;
}) {
  const { username } = await params;

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      showcases: true,
      links: true,
      socialConnects: true,
    },
  });

  if (!user) notFound();

  prisma.pageView.create({ data: { userId: user.id } }).catch(() => {});

  if (user.deactivated) {
    return (
      <main className="max-w-md mx-auto p-6 min-h-screen flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-2xl font-bold">This account has been deactivated</h1>
        <p className="text-muted-foreground text-sm text-balance">
          The owner of this profile has temporarily deactivated it.
        </p>
      </main>
    );
  }

  /* ======================================================
     THEME RESOLUTION
     ====================================================== */
  const themeId = (user.cardTheme as CardThemeId) || "default";
  const cardTheme = CARD_THEMES[themeId] ?? CARD_THEMES.default;

  // ✅ Custom theme background override
  const cardBackgroundImage =
    themeId === "custom" && user.customBgImageUrl
      ? user.customBgImageUrl
      : cardTheme.cardBgImage;

  return (
    <main className="max-w-3xl mx-auto p-4 sm:p-6 min-h-screen">
      <ProfileViewTracker username={user.username ?? ""} />
      <TemplateRenderer
        user={user}
        cardTheme={cardTheme}
        cardBackgroundImage={cardBackgroundImage}
      />
    </main>
  );
}
