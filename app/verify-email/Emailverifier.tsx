"use client";

import { signOut } from "@/lib/actions/auth-actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function EmailVerifier({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const searchParams = useSearchParams();
const verified = searchParams.get("verified");

useEffect(() => {
  if (verified === "true") {
    setMessage("✅ Email verified successfully. Redirecting...");
    setTimeout(() => {
      window.location.href = "/verify-email";
    }, 1500);
  }
}, [verified]);


  async function resendEmail() {
    if (loading) return;

    try {
      setLoading(true);
      setMessage("");

      await fetch("/api/auth/resend-verification", {
        method: "POST",
      });

      setMessage("Verification email sent. Check your inbox.");
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

 
        const router = useRouter();
        const handleSignout = async () => {
      // 1️⃣ Create a real promise from signOut
      const logoutPromise = signOut();
  
      // 2️⃣ Use that promise in the toast
      toast.promise(logoutPromise, {
        loading: "Signing out...",
        success: "You’ve been logged out 👋",
        error: "Failed to sign out",
      });
  
      // 3️⃣ Wait for it to finish → redirect
      logoutPromise.then(() => {
        router.push("/auth");
      });
    };

  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="w-full max-w-md border-[#1D2430] border-1 rounded-2xl shadow-lg p-8 text-center">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
          <svg
            className="h-6 w-6 text-[#FF5E57]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 12H8m8 0l-3-3m3 3l-3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-xl font-semibold text-gray-600">
          Verify your email
        </h1>

        <p className="mt-2 text-sm text-gray-300">
          We’ve sent a verification link to{" "}
          <span className="font-medium text-[#FF5E57]">{user.email}</span>.
          <br />
          Please check your inbox and click the link to activate your account.
        </p>

        <button
          onClick={resendEmail}
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-[#FF5E57] py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Resend verification email"}
        </button>

      {message && (
  <p className="mt-3 text-sm text-green-600 font-medium">
    {message}
  </p>
)}

        <p className="mt-6 text-sm text-gray-300">
          Didn’t receive the email?{" "}
          <button
            onClick={resendEmail}
            disabled={loading}
            className="font-medium text-[#FF5E57] hover:underline disabled:opacity-50"
          >
            Resend email
          </button>
        </p>

        <button
          onClick={handleSignout}
          className="mt-4 text-sm text-gray-400 hover:text-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default EmailVerifier;
