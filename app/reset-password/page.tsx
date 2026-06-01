export const dynamic = "force-dynamic";

"use client";


import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();

      toast.success("Password updated successfully 🔐");

      router.push("/auth/login");
    } catch {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-[#1D2430] rounded-2xl p-8 text-center">

        <h1 className="text-xl font-semibold text-gray-600">
          Reset your password
        </h1>

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
          className="mt-5 w-full bg-[#FF5E57] text-white py-2 rounded-lg"
        >
          {loading ? "Updating..." : "Update password"}
        </button>
      </div>
    </div>
  );
}