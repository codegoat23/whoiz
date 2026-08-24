import { requireAdmin } from "@/lib/admin";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Flag,
  BarChart3,
} from "lucide-react";
import MonitoringMobileNav from "./components/MonitoringMobileNav";
import MobileAdminToggle from "./components/MobileAdminToggle";

const monitoringNav = [
  { title: "Overview", href: "/admin/monitoring", icon: LayoutDashboard },
  { title: "Users", href: "/admin/monitoring/users", icon: Users },
  { title: "Profiles", href: "/admin/monitoring/profiles", icon: UserCheck },
  { title: "Reports", href: "/admin/monitoring/reports", icon: Flag },
  { title: "Analytics", href: "/admin/monitoring/analytics", icon: BarChart3 },
];

export default async function MonitoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <>
      <div className="w-full p-4 sm:p-6 lg:p-8 pb-32 md:pb-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-xl bg-accent border border-border">
                <BarChart3 className="size-4 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Monitoring
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Platform administration
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 overflow-x-auto pb-1">
              {monitoringNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap",
                      "hover:bg-accent hover:text-foreground",
                      item.href === "/admin/monitoring"
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {children}
        </div>
      </div>
      
      <MonitoringMobileNav />
    </>
  );
}
