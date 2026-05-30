import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { BioForm } from "./BioForm";

export default async function BioOnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const user = session.user as any;

  // If no username yet, force back to step 1
  if (!user?.username) {
    redirect("/onboarding/username");
  }

  // If already has bio, skip to admin
  if (user?.bio) {
    redirect("/admin");
  }

  return <BioForm />;
}
