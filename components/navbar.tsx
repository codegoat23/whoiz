"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
export default function GlassNavbar() {
  
  return (
    <header className="absolute top-5 left-1/2 z-50 w-[92%] sm:w-[88%] max-w-5xl -translate-x-1/2">
      
      <nav
        className={cn(
          "relative flex items-center justify-between w-full",
          "rounded-2xl px-4 sm:px-6 py-3",
          // glass base
        
        )}
      >
        {/* Ambient glow layer */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none" />

        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "relative text-sm sm:text-base tracking-wide",
            "text-orange-300 drop-shadow-[0_0_10px_rgba(249,115,22,0.35)]"
          )}
        >
          WHOIZ
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-orange-100/70 relative">

         

          <div className="flex items-center gap-3 ml-2">

            {/* Login */}
            <Button
              size="sm"
              className={cn(
                "rounded-2xl px-4",
                "bg-transparent",
                "text-white"
               
              )}
            >
              <Link href="/auth/login">Login</Link>
            </Button>

            {/* CTA */}
            <Button
              size="sm"
              className={cn(
                "rounded-2xl px-4 py-5",
                " bg-white",
                "text-black",
                " transition",
                "active:scale-95"
              )}
            >
              <Link href="/auth/signup">Create an account</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden relative inline-flex items-center justify-center rounded-xl p-2
                         bg-white/10 border border-orange-400/20
                         hover:bg-orange-500/20 transition"
            >
              <Menu className="h-5 w-5 text-orange-200" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-black/90 backdrop-blur-2xl text-white border-l border-orange-500/20"
          >
            <div className="absolute top-0 left-0 w-full h-40 bg-orange-500/10 blur-3xl" />

            <div className="mt-10 flex flex-col gap-6 relative">

              <Link
                href="#features"
                className="text-lg text-orange-100 hover:text-orange-300 transition"
              >
                Features
              </Link>

              <Link
                href="#about"
                className="text-lg text-orange-100 hover:text-orange-300 transition"
              >
                About
              </Link>

              <Link
                href="/auth/login"
                className="text-lg text-orange-100 hover:text-orange-300 transition"
              >
                Login
              </Link>

              <Button
                type="button"
                className={cn(
                  "mt-4 rounded-xl w-full",
                  "bg-gradient-to-r from-orange-500 to-orange-700",
                  "shadow-lg shadow-orange-500/30"
                )}
              >
                Open account
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}