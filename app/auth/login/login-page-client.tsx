"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { signIn } from "@/lib/actions/auth-actions/auth-actions";
import { LoginForm } from "@/components/login-form";
import { WhoizMatrixLoader } from "@/components/ui/whoiz-matrix-loader";

function LoginPageClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const deactivated = searchParams.get("deactivated") === "1";

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (isLoading) return;

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    setErrorMsg("");

    let navigated = false;

    try {
      const result = await signIn(email, password);

      if (!result?.user) {
        setErrorMsg("Invalid email or password");
        return;
      }

      navigated = true;
      // Branded transition while the authenticated dashboard boots.
      setShowLoader(true);
      router.push("/admin");
    } catch (error: any) {
      setShowLoader(false);
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      // On success the component unmounts after navigation; on failure the
      // form must return to a usable state.
      if (!navigated) setIsLoading(false);
    }
  }

  if (showLoader) {
    return <WhoizMatrixLoader />;
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
        isLoading={isLoading}
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
