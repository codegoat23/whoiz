"use client";

import { useState, useTransition } from "react";
import { updateUsername } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Permanent_Marker } from "next/font/google";
import Link from "next/link";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAction(formData: FormData) {
    startTransition(async () => {
      setError(null);
      try {
        formData.set("username", username.trim());
        await updateUsername(formData);
      } catch (err: any) {
        const message = err?.message || "Failed to save username";
        setError(message);
        toast.error(message);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* 🌅 ORANGE BACKDROP ENERGY */}
      <div className="absolute inset-0">
        <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/25 blur-[170px] rounded-full" />
        <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] bg-amber-400/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative w-full max-w-md flex flex-col items-center gap-8">

        {/* 🧭 ONBOARDING STEPPER */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">

            <div className="h-8 w-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              1
            </div>

            <div className="h-[2px] w-10 bg-orange-500/60" />

            <div className="h-8 w-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              2
            </div>

            <div className="h-[2px] w-10 bg-white/10" />

            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 text-white/40 flex items-center justify-center text-sm">
              3
            </div>
          </div>
        </div>

        {/* 📦 CARD */}
        <Card className="w-full p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_100px_-30px_rgba(255,120,0,0.35)]">

          {/* BRAND */}
          <div className="flex justify-center mb-6">
            <Link
              href="/"
              className={cn(
                permanentMarker.className,
                "text-xl tracking-wide text-orange-400 hover:text-orange-300 transition"
              )}
            >
              WHOIZ
            </Link>
          </div>

          {/* TITLE */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold text-white">
              Choose your username
            </h1>
            <p className="text-sm text-white/50 mt-1">
              This will be your public identity on the platform
            </p>
          </div>

          {/* FORM */}
          <form action={handleAction} className="space-y-5">

            {/* INPUT */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">
                Username
              </label>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-400/20 transition">
                <span className="text-white/40">@</span>

                <Input
                  name="username"
                  placeholder="eric_dev"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength={3}
                  maxLength={20}
                  required
                  disabled={isPending}
                  className="border-none bg-transparent text-white placeholder:text-white/30 focus-visible:ring-0"
                />
              </div>

              <p className="text-xs text-white/40">
                3–20 characters. Letters, numbers, and underscores only.
              </p>

              {error && (
                <p className="text-xs text-red-400 mt-1">{error}</p>
              )}
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={isPending || username.trim().length < 3}
              className="w-full rounded-xl font-semibold bg-gradient-to-r from-orange-500 to-amber-400 text-black hover:from-orange-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-orange-500/30"
            >
              {isPending ? "Saving..." : "Continue"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}