import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import { SettingsClient } from "./SettingsClient";

export default async function SettingsPage() {
  const user = await getSessionUser();

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, username: true },
  });

  if (!dbUser) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white/90">Settings</h1>
          <p className="text-sm text-white/40">
            Manage your account information, password and more
          </p>
        </div>

        <SettingsClient user={dbUser} />
      </div>
    </div>
  );
}
