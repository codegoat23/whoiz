"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  GalleryThumbnails,
  Home,
  Link2,
  Paintbrush,
  Settings,
  Smile,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { Logo } from "@/components/logo";

const navItems = [
  { title: "Profile", href: "/admin", icon: Home },
  { title: "Links", href: "/admin/links", icon: Link2 },
  { title: "Showcase", href: "/admin/showcase", icon: GalleryThumbnails },
  { title: "Connect", href: "/admin/connect", icon: Smile },
  { title: "Design", href: "/admin/themes", icon: Paintbrush },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

function Addsidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-white/10 bg-[#0b0b0b]">
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[160px] rounded-full" />
      </div>

      {/* LOGO */}
      <SidebarHeader className="py-8 relative">
        <div className="flex justify-start">
           <Logo
  width={100}
  height={36}

/>
        </div>
      </SidebarHeader>

      {/* NAV */}
      <SidebarContent className="px-3 relative">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link key={item.href} href={item.href}>
              <Button
  variant="ghost"
  className={cn(
    "w-full justify-start gap-4 h-12 rounded-xl transition-all duration-200 relative overflow-hidden text-lg",
    "hover:translate-x-1 hover:bg-white/5",
    active
      ? "text-orange-300 bg-white/20"
      : "text-white/60 hover:text-white"
  )}
>
  <Icon
    className={cn(
      "h-6 w-6 shrink-0 transition",
      active ? "text-white" : "text-white/50"
    )}
  />

  <span
    className={cn(
      "text-lg transition",
      active ? "text-white" : "text-white/50"
    )}
  >
    {item.title}
  </span>
</Button>
              </Link>
            );
          })}
        </div>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="p-3 relative space-y-3">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div
            className="absolute inset-0 opacity-15"
           
          />
          <div className="relative z-10 rounded-2xl bg-white p-4 shadow-sm">
  <div className="flex flex-col">
  

    <p className="mt-1 text-sm font-semibold tracking-tight text-black">
      Build your digital identity
    </p>

    <p className="mt-1 text-xs leading-relaxed text-black/50">
      Create a personal space that brings your work, links, and identity
      together.
    </p>

    <button
      className="mt-4 w-full rounded-xl bg-black px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-black/90"
    >
      Get Started
    </button>
  </div>
</div>
        </div>

     
      </SidebarFooter>
    </Sidebar>
  );
}

export default Addsidebar;
