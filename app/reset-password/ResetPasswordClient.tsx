"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Password updated successfully 🔐");

      router.push("/auth/login");
    } catch (err) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-[#1D2430] rounded-2xl p-8 text-center bg-white/5 backdrop-blur-md">

        <h1 className="text-xl font-semibold text-gray-600">
          Reset your password
        </h1>

        <p className="text-sm text-gray-400 mt-2">
          Enter your new password below
        </p>

        <input
          type="password"
          className="mt-5 w-full border p-2 rounded-lg"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={resetPassword}
          disabled={loading}
          className="mt-5 w-full bg-[#FF5E57] text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </div>
    </div>
  );
}