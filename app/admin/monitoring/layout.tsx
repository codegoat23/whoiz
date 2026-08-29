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
         

          {children}
        </div>
      </div>
      
      <MonitoringMobileNav />
    </>
  );
}
