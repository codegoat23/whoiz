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
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Choose your theme</h1>
         
        </div>

        <ThemesClient initialTheme={currentTheme} />
      </div>
    </div>
  );
}
