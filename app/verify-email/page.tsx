// app/verify-email/page.tsx
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import EmailVerifier from "./Emailverifier";


export default async function EmailVerificationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Not logged in → login
  if (!session) {
    redirect("/auth");
  }

  const user = session.user;

  // Already verified → continue flow
  if (user.emailVerified) {
    if (!user.username) redirect("/onboarding/username");
    if (!user.bio) redirect("/onboarding/bio");
    redirect("/admin");
  }

  // Only unverified users reach here
  return <EmailVerifier user={user} />;
}
