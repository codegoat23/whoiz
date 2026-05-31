"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import {
  GalleryThumbnails,
  Home,
  Link2,
  Paintbrush,
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
  {
    title: "Profile",
    href: "/admin",
    icon: Home,
  },
  {
    title: "Links",
    href: "/admin/links",
    icon: Link2,
  },
  {
    title: "Showcase",
    href: "/admin/showcase",
    icon: GalleryThumbnails,
  },
  {
    title: "Connect",
    href: "/admin/connect",
    icon: Smile,
  },
  {
    title: "Design",
    href: "/admin/themes",
    icon: Paintbrush,
  },
];

function Addsidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-zinc-800 bg-[#111111]">
      {/* Logo */}
      <SidebarHeader className="py-8">
        <div className="flex justify-center">
          <Link
            href="/admin"
            className={cn(
              permanentMarker.className,
              "text-4xl tracking-wide text-[#FF5E57]"
            )}
          >
            WHOIZ
          </Link>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/admin" &&
                pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 h-12 rounded-xl transition-all cursor-pointer",
                    active
                      ? "bg-[#FF5E57] text-white hover:bg-[#FF5E57]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.title}
                </Button>
              </Link>
            );
          })}
        </div>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3">
        <div className="mb-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
          <p className="text-xs text-zinc-500">
            Whoiz Dashboard
          </p>

          <p className="text-sm font-medium text-zinc-200">
            Build your digital identity
          </p>
        </div>

        <Button
          onClick={async () => {
            await signOut();
            toast.success("Logged out");
            router.push("/auth/login");
          }}
          className="w-full rounded-xl bg-[#FF5E57] hover:bg-[#ff4d45]"
        >
          Log out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default Addsidebar;