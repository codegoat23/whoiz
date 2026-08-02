import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CardThemeId } from "@/lib/cardThemes";
import { ThemesClient } from "./ThemesClient";
import { getSessionUser } from "@/lib/session";

export default async function ThemesPage() {
  const user = await getSessionUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { cardTheme: true, name: true },
  });

  if (!dbUser) {
    redirect("/auth/login");
  }

  const currentTheme = (dbUser.cardTheme || "default") as CardThemeId;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Choose your theme</h1>
        <p className="text-sm text-muted-foreground">
          Pick one of the available themes. It will update the card on your public profile page.
        </p>
      </div>

      <ThemesClient initialTheme={currentTheme} />
    </div>
  );
}
