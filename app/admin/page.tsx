import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminPage from "./AdminPage";

export default async function Admin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const user = session.user;
 if (!user.emailVerified){
      redirect("/verify-email");
    }
  // If user somehow tries to hit /admin without finishing onboarding
  if (!user?.username) {
    redirect("/onboarding/username");
  }

  if (!user?.bio) {
    redirect("/onboarding/bio");
  }

  return <AdminPage session={session}/>;
}
