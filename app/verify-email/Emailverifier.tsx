"use client";

import { signOut } from "@/lib/actions/auth-actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function EmailVerifier({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const verified = searchParams.get("verified");

  useEffect(() => {
    if (verified === "true") {
      setMessage("Email verified successfully. Redirecting...");
      setTimeout(() => {
        router.push("/verify-email");
      }, 1500);
    }
  }, [verified, router]);

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

  const handleSignout = async () => {
    const logoutPromise = signOut();

    toast.promise(logoutPromise, {
      loading: "Signing out...",
      success: "You’ve been logged out 👋",
      error: "Failed to sign out",
    });

    logoutPromise.then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* 🌅 ORANGE AMBIENT BACKGROUND */}
      <div className="absolute inset-0">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/25 blur-[160px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-80px] w-[500px] h-[500px] bg-amber-400/20 blur-[140px] rounded-full" />
      </div>

      {/* 📦 CARD */}
      <div className="relative w-full max-w-md">

        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">

            <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              1
            </div>

            <div className="h-[2px] w-10 bg-white/10" />

            <div className="h-8 w-8 rounded-full bg-white/5 text-white/40 border border-white/10 flex items-center justify-center text-sm">
              2
            </div>

            <div className="h-[2px] w-10 bg-white/10" />

            <div className="h-8 w-8 rounded-full bg-white/5 text-white/40 border border-white/10 flex items-center justify-center text-sm">
              3
            </div>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_100px_-30px_rgba(255,120,0,0.35)] p-8 text-center">

          {/* ICON */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
            <svg
              className="h-6 w-6 text-orange-400"
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

          {/* TITLE */}
          <h1 className="text-xl font-semibold text-white">
            Verify your email
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            We’ve sent a verification link to{" "}
            <span className="text-orange-300 font-medium">{user.email}</span>.
            <br />
            Open your inbox and tap the link to unlock your account.
          </p>

          {/* BUTTON */}
          <button
            onClick={resendEmail}
            disabled={loading}
            className="mt-6 w-full rounded-xl py-2.5 text-sm font-medium 
            bg-gradient-to-r from-orange-500 to-amber-400 text-black
            hover:from-orange-400 hover:to-amber-300
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Resend verification email"}
          </button>

          {/* MESSAGE */}
          {message && (
            <p className="mt-3 text-sm text-orange-300 font-medium">
              {message}
            </p>
          )}

          {/* RESEND LINK */}
          <p className="mt-6 text-sm text-white/50">
            Didn’t receive it?{" "}
            <button
              onClick={resendEmail}
              disabled={loading}
              className="text-orange-300 hover:text-orange-200 font-medium hover:underline"
            >
              Resend
            </button>
          </p>

          {/* LOGOUT */}
          <button
            onClick={handleSignout}
            className="mt-5 text-sm text-white/40 hover:text-white/70 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifier;