"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { Permanent_Marker } from "next/font/google"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
})

export default function WhoizFooter() {
  return (
    <footer className="w-full bg-[#ff5f57] mt-20">
      <div className="flex flex-row  mt-2 p-6 justify-between items-center ">
        <Separator className="w-[130dvh] bg-black h-0.5 hidden lg:block"/>
        <span>Tell us anything</span>
        <Button className="bg-black rounded-4xl">feedback@whoiz.bio</Button>

      </div>
      <div className="mx-auto flex min-h-[500px] max-w-7xl flex-col items-center justify-between px-6 py-12 mt-2">
        <div
          className={cn(
            permanentMarker.className,
            "text-[11px] md:text-7xl text-white"
          )}
        >
         <span className="text-7xl lg:text-[230px]"> WHOIZ</span>
        </div>

        <nav className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-white/90">
          <Link href="#" className="hover:text-white transition">Home</Link>
          <Link href="#" className="hover:text-white transition">About</Link>
          <Link href="#" className="hover:text-white transition">FAQ</Link>
          <Link href="#" className="hover:text-white transition">Blog</Link>
          <Link href="#" className="hover:text-white transition">Login</Link>
          <Link href="#" className="hover:text-white transition">Sign up</Link>
        </nav>
      </div>
    </footer>
  )
}
