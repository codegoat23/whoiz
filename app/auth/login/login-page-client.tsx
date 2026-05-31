"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/actions/auth-actions/auth-actions";
import { LoginForm } from "@/components/login-form";

export default function LoginPageClient() {
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn(email, password);

    if (!result?.user) {
      setErrorMsg("Invalid email or password");
      return;
    }

    router.push("/admin");
  }

  return (
    <>
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