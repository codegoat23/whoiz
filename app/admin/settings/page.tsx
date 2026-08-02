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
    <div className="max-w-3xl mx-auto p-6 space-y-6 w-full">
      <div>
        <h1 className="text-2xl font-bold text-white/90">Settings</h1>
        <p className="text-sm text-white/40">
          Manage your account information, password and more
        </p>
      </div>

      <SettingsClient user={dbUser} />
    </div>
  );
}
