"use client";

import React, { useState } from "react";
import PhotoStack from "./PhotoStack";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Hero2() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function normalize(raw: string): string {
    return raw
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9_-]/g, "");
  }

  async function handleCreate() {
    const normalized = normalize(username);

    if (normalized.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (normalized.length > 20) {
      setError("Username must be at most 20 characters");
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(normalized)) {
      setError("Only letters, numbers, dashes and underscores allowed");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: normalized }),
      });

      const data = await res.json();

      if (!data.available) {
        setError(data.error || "Username is already taken");
        return;
      }

      router.push(`/auth/signup?username=${encodeURIComponent(data.username)}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreate();
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Ambient Orange Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[180px] rounded-full " />

      <div className="grid max-w-screen-xl px-4 sm:px-3 py-16 sm:py-20 mx-auto lg:grid-cols-12 items-center relative">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          {/* Title */}
          <h1 className="max-w-xl mb-5 text-5xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white text-center">
            Tell the{" "}
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              world
            </span>{" "}
            who you are
          </h1>

          {/* Subtitle */}
       <p className="max-w-xl mb-8 text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed text-center">
  Share your story, showcase your work, and let your personality shine.
  Everything you are, all in one place.
</p>

          {/* INPUT CARD */}
          <div className="flex flex-col w-full max-w-lg gap-2">
            <div className="flex flex-col sm:flex-row w-full gap-3">
              <div className="flex items-center flex-1 min-w-0 rounded-3xl px-4 py-3 border border-orange-500/30 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(249,115,22,0.25)] focus-within:ring-2 focus-within:ring-orange-400/40 transition">

                {/* Icon */}
                <div className="flex items-center pr-2 shrink-0">
                  <Image
                    src="/logos/logo2.svg"
                    alt="WHOIZ"
                    width={20}
                    height={20}
                    className="w-5 h-5 sm:w-6.5 sm:h-6.5"
                  />
                </div>

                <span className="text-orange-500 text-sm select-none mr-1 shrink-0">
                  whoiz.space/
                </span>

                <input
                  type="text"
                  id="username"
                  placeholder="yourname"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-w-0 bg-transparent outline-none text-white text-sm placeholder:text-gray-500"
                  required
                />
              </div>
              <button
                type="button"
                onClick={handleCreate}
                disabled={loading || !username.trim()}
                className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-full px-6 py-3 text-sm font-medium hover:shadow-orange-500/50 hover:scale-[1.03] transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Create"}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-xs mt-1 px-1">{error}</p>
            )}
          </div>
          
        </div>

        {/* RIGHT VISUAL → REPLACED */}
        <div className="hidden lg:flex lg:col-span-5 justify-center">
         <PhotoStack />
        </div>

      </div>
    </section>
  );
}

export default Hero2;
