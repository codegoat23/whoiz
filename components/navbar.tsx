"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
})

export default function GlassNavbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 w-[92%] sm:w-[90%] max-w-3xl -translate-x-1/2">
      <nav
        className={cn(
          "flex items-center justify-between",
          "rounded-2xl px-4 py-3 sm:px-6",
          "bg-white/10 backdrop-blur-xl",
          "border border-white/20",
          "shadow-lg w-full"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            permanentMarker.className,
            "text-sm sm:text-base tracking-wide text-[#FF5E57]"
          )}
        >
          WHOIZ
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <Link href="#features" className="transition hover:text-foreground">
            Features
          </Link>

          <Link href="#about" className="transition hover:text-foreground">
            About
          </Link>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              className="rounded-2xl bg-[#A32E2E] text-white hover:bg-[#A32E2E]/80 px-4"
            >
              <Link href="/auth">Login</Link>
            </Button>

            <Button
              type="button"
              size="sm"
              className="rounded-2xl bg-[#A32E2E] text-white hover:bg-[#A32E2E]/80 px-4"
            >
              <Link href="/auth">Open account</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-white/10"
            >
              <Menu className="h-5 w-5 text-white" />
            </button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="bg-black/90 backdrop-blur-xl text-white"
          >
            <div className="mt-10 flex flex-col gap-6">
              <Link href="#features" className="text-lg">
                Features
              </Link>

              <Link href="#about" className="text-lg">
                About
              </Link>

              <Link href="/auth" className="text-lg">
                Login
              </Link>

              <Button type="button" className="mt-4 rounded-xl w-full">
                Open account
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}