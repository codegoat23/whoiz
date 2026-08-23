"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { isAdminEmail } from "@/lib/admin-utils";
import { Shield, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserWithEmail {
  email?: string | null;
}

export default function MobileAdminToggle() {
  const { data: session } = useSession();
  const user = session?.user as UserWithEmail | undefined;
  const pathname = usePathname();

  const isOnMonitoring = pathname.startsWith("/admin/monitoring");

  if (!user?.email || !isAdminEmail(user.email)) {
    return null;
  }

  return (
    <div className="fixed bottom-[80px] left-0 right-0 z-50 flex justify-center px-3 pointer-events-none md:hidden sm:bottom-[88px] sm:px-4">
      <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-white/90 backdrop-blur-xl border border-neutral-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
        <Link
          href="/admin/monitoring"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200",
            isOnMonitoring
              ? "bg-[#FF5800] text-white shadow-md shadow-orange-500/25"
              : "text-zinc-500 hover:text-zinc-800"
          )}
        >
          <Shield className="size-3" />
          Admin
        </Link>
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-200",
            !isOnMonitoring
              ? "bg-[#FF5800] text-white shadow-md shadow-orange-500/25"
              : "text-zinc-500 hover:text-zinc-800"
          )}
        >
          <Home className="size-3" />
          Profile
        </Link>
      </div>
    </div>
  );
}
