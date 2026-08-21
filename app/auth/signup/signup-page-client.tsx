"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/actions/auth-actions/auth-actions";
import { SignupForm } from "@/components/signup-form";
import { Suspense } from "react";

function SignupPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefilledUsername = searchParams.get("username") || "";

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (isSubmitting) return;

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword =
      formData.get("confirm-password") as string;
    const username = formData.get("username") as string;

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const result = await signUp(
        email,
        password,
        name,
        username || undefined
      );

      if (!result?.user) {
        setErrorMsg("Failed to create account");
        return;
      }

      router.push("/verify-email");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {errorMsg && (
        <p className="text-red-500 text-sm mb-4">
          {errorMsg}
        </p>
      )}

      <SignupForm
        onSubmit={handleSubmit}
        prefilledUsername={prefilledUsername}
        isLoading={isSubmitting}
      />
    </>
  );
}

export default function SignupPageClient() {
  return (
    <Suspense>
      <SignupPageInner />
    </Suspense>
  );
}
