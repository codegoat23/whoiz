"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function WhoizFooter() {
  return (
    <footer className="relative w-full mt-24 overflow-hidden">

      {/* Background gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-700/30 via-orange-500/10 to-black" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/20 blur-[160px] rounded-full" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 flex flex-col gap-10">

        {/* Top strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <span className="text-orange-100/80 text-sm tracking-wide">
            Tell us anything
          </span>

          <Button
            className="rounded-full px-5 py-2 text-sm
                       bg-white/10 border border-orange-400/20
                       text-orange-100 backdrop-blur-md
                       hover:bg-orange-500/20 transition"
          >
            feedback@whoiz.bio
          </Button>
        </div>

        {/* Divider glow line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

        {/* Big brand */}
        <div
          className="text-center leading-none"
        >
          <span className="text-5xl sm:text-7xl md:text-[140px] lg:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-400 to-orange-600 drop-shadow-[0_0_25px_rgba(249,115,22,0.25)]">
            WHOIZ
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-sm text-orange-100/70">
          <Link className="hover:text-orange-300 transition" href="#">
            Home
          </Link>
          <Link className="hover:text-orange-300 transition" href="#">
            About
          </Link>
          <Link className="hover:text-orange-300 transition" href="#">
            FAQ
          </Link>
          <Link className="hover:text-orange-300 transition" href="#">
            Blog
          </Link>
          <Link className="hover:text-orange-300 transition" href="#">
            Login
          </Link>
          <Link className="hover:text-orange-300 transition" href="#">
            Sign up
          </Link>
        </nav>

        {/* Bottom micro line */}
        <div className="text-center text-xs text-orange-100/40 mt-6">
          Built with warmth, clarity, and intent.
        </div>
      </div>
    </footer>
  );
}