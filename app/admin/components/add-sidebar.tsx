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

import { Permanent_Marker } from "next/font/google";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
});

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
    <Sidebar className="fixed left-0 top-0 h-screen w-[250px] border-r border-white/10 bg-[#0b0b0b]">

      {/* 🌅 BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px]  blur-[160px] rounded-full" />
      </div>

      {/* LOGO */}
      <SidebarHeader className="py-10 relative">
        <div className="flex justify-center">
          <Link
            href="/admin"
            className={cn(
              permanentMarker.className,
              "text-4xl tracking-wide text-orange-400 hover:text-orange-300 transition"
            )}
          >
            WHOIZ
          </Link>
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
                    "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 relative overflow-hidden",
                    "hover:translate-x-1 hover:bg-white/5",

                    active
                      ? "text-orange-300 bg-white/5 border border-orange-500/20 "
                      : "text-white/60 hover:text-white"
                  )}
                >

                  {/* ACTIVE LEFT BAR */}
                  {active && (
                    <span className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-orange-400 to-amber-300 rounded-r-full" />
                  )}

                  <Icon
                    className={cn(
                      "h-5 w-5 transition",
                      active ? "text-orange-400" : "text-white/50"
                    )}
                  />

                  <span className="text-sm font-medium">
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

        {/* STATUS CARD */}
       <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
  <div
    className="absolute inset-0 opacity-15"
    style={{
      backgroundImage: "url('/tile_background.png')",
      backgroundSize: "850px",
      backgroundRepeat: "repeat",
    }}
  />

  <div className="relative z-10">
    <p className="text-xs text-white/40">
      Whoiz Dashboard
    </p>

    <p className="text-sm font-medium text-white/80">
      Build your digital identity
    </p>

    <div className="mt-2 flex items-center gap-2 text-xs text-orange-300">
      <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
      Live system
    </div>
  </div>
</div>
        {/* LOGOUT */}
        <Button
          onClick={async () => {
            await signOut();
            toast.success("Logged out");
            router.push("/auth/login");
          }}
          className="
            w-full rounded-xl font-semibold
          bg-orange-500
            text-white hover:from-orange-400 hover:to-amber-300
            
            transition-all duration-300
          "
        >
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Addsidebar;