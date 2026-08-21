"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FadeUp } from "@/components/motion-wrapper";

export default function GlassNavbar() {
  return (
    <header className="absolute top-5 left-1/2 z-50 w-[92%] sm:w-[88%] max-w-5xl -translate-x-1/2">
      <FadeUp delay={0} duration={0.7} amount={0}>
        <nav
          className={cn(
            "relative flex items-center justify-between w-full",
            "rounded-2xl px-4 sm:px-6 py-3"
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
            <Image
              src="/logos/logo3.svg"
              alt="WHOIZ"
              width={180}
              height={50}
              className="h-8 w-auto sm:h-10 lg:h-12 object-contain"
            />
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
                  "bg-white",
                  "text-black",
                  "transition",
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
    side="top"
    className="
      bg-black/95 backdrop-blur-2xl text-white
    
      rounded-b-3xl
      px-6 pt-16 pb-8
  

      data-[state=open]:animate-in
      data-[state=closed]:animate-out
      data-[state=open]:slide-in-from-top
      data-[state=closed]:slide-out-to-top
      data-[state=open]:duration-500
      data-[state=closed]:duration-300
    "
  >
    {/* Orange glow */}
   

    <div className="relative mx-auto flex w-full max-w-sm flex-col items-center gap-3">
     

      {/* Navigation */}
      <Link
        href="#features"
        className="
          w-full rounded-2xl px-5 py-4
          text-center text-base font-medium
          text-orange-100
          transition-all duration-200
          hover:bg-orange-500/10
          hover:text-orange-300
        "
      >
        Features
      </Link>

      <Link
        href="#about"
        className="
          w-full rounded-2xl px-5 py-4
          text-center text-base font-medium
          text-orange-100
          transition-all duration-200
          hover:bg-orange-500/10
          hover:text-orange-300
        "
      >
        About
      </Link>

      <Link
        href="/auth/login"
        className="
          w-full rounded-2xl px-5 py-4
          text-center text-base font-medium
          text-orange-100
          transition-all duration-200
          hover:bg-orange-500/10
          hover:text-orange-300
        "
      >
        Login
      </Link>

      <Button
        type="button"
        className="
          mt-4 h-12 w-full rounded-2xl
          text-black
          bg-white
          font-semibold 
          
          transition-all duration-200
          hover:scale-[1.02]
          hover:shadow-orange-500/40
        "
      >
        Open account
      </Button>
    </div>
  </SheetContent>
</Sheet>
        </nav>
      </FadeUp>
    </header>
  );
}
