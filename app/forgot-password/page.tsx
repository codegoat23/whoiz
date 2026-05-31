"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendResetLink = async () => {
    if (!email) return;

    try {
      setLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error();

      toast.success("Reset link sent. Check your email 📩");
      setEmail("");
    } catch {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-[#1D2430] rounded-2xl shadow-lg p-8 text-center">

        <h1 className="text-xl font-semibold text-gray-600">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          Enter your email and we’ll send you a reset link.
        </p>

        <input
          type="email"
          className="mt-5 w-full rounded-lg border p-2 text-sm"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendResetLink}
          disabled={loading}
          className="mt-5 w-full rounded-lg bg-[#FF5E57] py-2 text-white text-sm"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </div>
    </div>
  );
}