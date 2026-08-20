"use client";

import { signOut } from "@/lib/actions/auth-actions/auth-actions";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function EmailVerifier({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const verified = searchParams.get("verified");
  const urlError = searchParams.get("error");

  useEffect(() => {
    if (verified === "true") {
      setMessage("Email verified successfully. Redirecting...");
      setTimeout(() => {
        router.push("/verify-email");
      }, 1500);
    }
  }, [verified, router]);

  useEffect(() => {
    if (urlError === "expired") {
      setError("This code has expired. Please request a new one.");
    } else if (urlError === "invalid") {
      setError("Invalid code. Please try again.");
    }
  }, [urlError]);

  // Auto-submit when all6 digits are entered
  useEffect(() => {
    const code = otp.join("");
    if (code.length === 6 && !verifying) {
      verifyOtp(code);
    }
  }, [otp]);

  async function verifyOtp(code: string) {
    setVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Verification failed");
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
        return;
      }

      toast.success("Email verified!");
      setMessage("Email verified successfully. Redirecting...");
      setTimeout(() => {
        router.push("/verify-email");
      }, 1500);
    } catch {
      setError("Something went wrong. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setVerifying(false);
    }
  }

  function handleChange(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = pasted.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    const nextEmpty = newOtp.findIndex((v) => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  }

  async function resendEmail() {
    if (loading) return;

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send code");
        return;
      }

      setMessage("New code sent. Check your inbox.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleSignout = async () => {
    const logoutPromise = signOut();
    toast.promise(logoutPromise, {
      loading: "Signing out...",
      success: "You've been logged out",
      error: "Failed to sign out",
    });
    logoutPromise.then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        {/* STEP INDICATOR */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              1
            </div>
            <div className="h-[2px] w-10 bg-white/10" />
            <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              2
            </div>
            <div className="h-[2px] w-10 bg-white/10" />
            <div className="h-8 w-8 rounded-full bg-white/5 text-white/40 border border-white/10 flex items-center justify-center text-sm">
              3
            </div>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 text-center">
          {/* ICON */}
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
            <svg className="h-6 w-6 text-orange-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0l-3-3m3 3l-3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          {/* TITLE */}
          <h1 className="text-xl font-semibold text-white">Verify your email</h1>

          {/* DESCRIPTION */}
          <p className="mt-2 text-sm text-white/60 leading-relaxed">
            We sent a 6-digit code to{" "}
            <span className="text-orange-300 font-medium">{user.email}</span>.
          </p>

          {/* ERROR */}
          {error && (
            <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* SUCCESS MESSAGE */}
          {message && (
            <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </div>
          )}

          {/* OTP INPUT */}
          <div className="mt-6 flex justify-center gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                disabled={verifying}
                className="h-12 w-10 text-center text-lg font-semibold rounded-lg border border-white/10 bg-white/5 text-white outline-none transition-colors focus:border-orange-500/50 focus:bg-white/10 disabled:opacity-50"
              />
            ))}
          </div>

          {/* VERIFYING STATE */}
          {verifying && (
            <p className="mt-4 text-sm text-orange-300">Verifying...</p>
          )}

          {/* RESEND */}
          <button
            onClick={resendEmail}
            disabled={loading}
            className="mt-6 text-sm text-white/50 hover:text-orange-300 font-medium transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Resend code"}
          </button>

          {/* LOGOUT */}
          <button
            onClick={handleSignout}
            className="mt-4 block mx-auto text-sm text-white/40 hover:text-white/70 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerifier;
