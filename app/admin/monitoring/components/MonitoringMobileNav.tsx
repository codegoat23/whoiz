"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  LayoutDashboard,
  UserCheck,
  Flag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { title: "Overview", href: "/admin/monitoring", icon: LayoutDashboard },
  { title: "Users", href: "/admin/monitoring/users", icon: Users },
  { title: "Profiles", href: "/admin/monitoring/profiles", icon: UserCheck },
  { title: "Reports", href: "/admin/monitoring/reports", icon: Flag },
  { title: "Analytics", href: "/admin/monitoring/analytics", icon: BarChart3 },
];

export default function MonitoringMobileNav() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin/monitoring"
      ? pathname === "/admin/monitoring"
      : pathname.startsWith(href);

  return (
    <div className="fixed bottom-3 left-0 right-0 z-50 flex justify-center px-3 pointer-events-none md:hidden sm:bottom-4 sm:px-4">
      <nav
        role="navigation"
        aria-label="Admin Mobile Navigation"
        className="pointer-events-auto flex items-center justify-center w-full max-w-[420px] h-[64px] rounded-full bg-white px-2 py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-neutral-100/90 sm:h-[72px] sm:px-3"
      >
        <div className="flex items-center justify-around flex-1 gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.title}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 py-1 transition-all duration-200 active:scale-90 sm:gap-1"
              >
                <Icon
                  className={cn(
                    "size-4.5 transition-colors duration-200 sm:size-5",
                    active ? "text-[#FF6900]" : "text-zinc-600"
                  )}
                  strokeWidth={2.2}
                />
                <span
                  className={cn(
                    "text-[8px] tracking-tight transition-colors duration-200 leading-tight sm:text-[10px]",
                    active
                      ? "text-black font-semibold"
                      : "text-zinc-500 font-medium"
                  )}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
