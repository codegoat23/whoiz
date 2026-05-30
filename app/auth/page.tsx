import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import AuthPage from "./Authpage";

export default async function AuthTest() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const user = session.user; // adjust if your session shape is different
    if (!user?.emailVerified){
      redirect("/verify-email")
    }
    // 1️⃣ No username yet → first onboarding step

    if (!user?.username) {
      redirect("/onboarding/username");
    }

    // 2️⃣ Username exists but no bio → second step
    if (!user?.bio) {
      redirect("/onboarding/bio");
    }

    // 3️⃣ Fully onboarded → go to dashboard
    redirect("/admin");
  }

  // No session → show login/signup
  return <AuthPage />;
}
