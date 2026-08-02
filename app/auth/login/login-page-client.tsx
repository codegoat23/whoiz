"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signIn } from "@/lib/actions/auth-actions/auth-actions";
import { LoginForm } from "@/components/login-form";

function LoginPageClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMsg, setErrorMsg] = useState("");

  const deactivated = searchParams.get("deactivated") === "1";

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn(email, password);

      if (!result?.user) {
        setErrorMsg("Invalid email or password");
        return;
      }

      router.push("/admin");
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong");
    }
  }

  return (
    <>
      {deactivated && (
        <div className="mb-4 rounded-lg border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-sm text-orange-200">
          Your account has been deactivated. Contact support to reactivate it.
        </div>
      )}

      {errorMsg && (
        <p className="text-red-500 text-sm mb-4">
          {errorMsg}
        </p>
      )}

      <LoginForm
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default function LoginPageClient() {
  return (
    <Suspense fallback={null}>
      <LoginPageClientContent />
    </Suspense>
  );
}
