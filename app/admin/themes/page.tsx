import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CardThemeId } from "@/lib/cardThemes";
import { ProfileTemplateId } from "@/lib/profileTemplates";
import { getSessionUser } from "@/lib/session";
import DesignStudio from "./DesignStudio";
import { ProfileUser } from "@/components/profile-templates/types";

export default async function ThemesPage() {
  const user = await getSessionUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      showcases: true,
      links: true,
      socialConnects: true,
    },
  });

  if (!dbUser) {
    redirect("/auth/login");
  }

  const currentTheme = (dbUser.cardTheme || "default") as CardThemeId;
  const currentTemplate = (dbUser.profileTemplate || "classic") as ProfileTemplateId;

  const profileUser: ProfileUser = {
    id: dbUser.id,
    username: dbUser.username,
    name: dbUser.name,
    bio: dbUser.bio,
    avatarUrl: dbUser.avatarUrl,
    story: dbUser.story,
    favArtist: dbUser.favArtist,
    favPlaylist: dbUser.favPlaylist,
    favSong: dbUser.favSong,
    spotifyAcc: dbUser.spotifyAcc,
    cardTheme: dbUser.cardTheme,
    customBgImageUrl: dbUser.customBgImageUrl,
    profileTemplate: dbUser.profileTemplate,
    createdAt: dbUser.createdAt,
    links: dbUser.links,
    showcases: dbUser.showcases,
    socialConnects: dbUser.socialConnects,
  };

  return (
    <DesignStudio
      user={profileUser}
      initialTheme={currentTheme}
      initialTemplate={currentTemplate}
      customBgImageUrl={dbUser.customBgImageUrl}
    />
  );
}
