"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { isAdminEmail } from "@/lib/admin-utils";
import { Shield, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserWithEmail {
  email?: string | null;
}

export default function AdminToggle() {
  const { data: session } = useSession();
  const user = session?.user as UserWithEmail | undefined;
  const pathname = usePathname();

  const isOnMonitoring = pathname.startsWith("/admin/monitoring");

  if (!user?.email || !isAdminEmail(user.email)) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-11">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/50 border border-border">
            <Link
              href="/admin/monitoring"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                isOnMonitoring
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Shield className="size-3.5" />
              Admin
            </Link>
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                !isOnMonitoring
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <User className="size-3.5" />
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
