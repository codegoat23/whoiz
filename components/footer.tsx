"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Image from "next/image";

export default function WhoizFooter() {
  return (
    <footer className="relative w-full mt-24 overflow-hidden">

    

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-16 flex flex-col gap-8 sm:gap-10">


        {/* Divider glow line */}
        <div className="h-px w-full" />

        {/* Big brand */}
        <div
          className="text-center leading-none flex justify-center items-center"
        >
          <Image
  src="/logos/logo3.svg"
  alt="WHOIZ"
  width={500}
  height={80}
  priority
  className="h-30 sm:h-10 md:h-12 lg:h-14 w-auto object-contain"
/>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-orange-100/70">
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
       <div className="mt-6 text-center text-xs text-orange-100/40">
  © {new Date().getFullYear()}
</div>
      </div>
    </footer>
  );
}