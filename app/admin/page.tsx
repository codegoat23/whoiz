import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/session";
import AdminPage from "./AdminPage";

export default async function Admin() {
  const sessionUser = await getSessionUser();

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      bio: true,
      story: true,
      avatarUrl: true,
    },
  });

  if (!user) {
    redirect("/auth/login");
  }

  return <AdminPage user={user} />;
}
