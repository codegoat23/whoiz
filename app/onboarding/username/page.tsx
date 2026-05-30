import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UsernameForm } from "./UsernameForm";

export default async function UsernameOnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const user = session.user as any;

  // If already has username, skip to bio
  if (user?.username) {
    redirect("/onboarding/bio");
  }

  return <UsernameForm />;
}
