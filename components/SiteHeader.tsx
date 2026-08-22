"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchCommand } from "@/components/SearchCommand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { LogOut, Settings, User, ChevronDown, Sun, Moon } from "lucide-react";
import { toast } from "sonner";

interface UserWithExtras {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  username?: string | null;
}

export function SiteHeader() {
  const { data: session } = useSession();
  const user = session?.user as UserWithExtras | undefined;
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const { theme, setTheme } = useTheme();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      toast.success("Logged out");
      router.push("/auth/login");
    } catch {
      toast.error("Failed to log out");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/80 backdrop-blur-xl px-4">
      <SidebarTrigger className="hidden md:flex text-muted-foreground hover:text-foreground" />
      <div className="flex-1" />
      <SearchCommand />

      <Button
        variant="ghost"
        size="icon"
        className="size-9 text-muted-foreground hover:text-foreground"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      >
        <Sun className="size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute size-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Open user menu"
            className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <Avatar className="size-8">
              <AvatarImage src={user?.avatarUrl ?? undefined} alt={user?.name ?? ""} />
              <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden size-3.5 text-muted-foreground sm:block" />
          </button>
        </DropdownMenuTrigger>

      <DropdownMenuContent
  align="end"
  sideOffset={10}
  className="w-64 rounded-2xl border border-white/10 bg-[#111111]/95 p-2 text-white shadow-2xl shadow-black/40 backdrop-blur-xl"
>
  {/* User Info */}
  <DropdownMenuLabel className="px-3 py-3 font-normal">
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/20">
        {user?.name?.charAt(0)?.toUpperCase() || "U"}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {user?.name || "User"}
        </p>

        {user?.username && (
          <p className="mt-0.5 truncate text-xs text-white/45">
            @{user.username}
          </p>
        )}
      </div>
    </div>
  </DropdownMenuLabel>

  <DropdownMenuSeparator className="my-2 bg-white/10" />

  {/* Profile */}
  <DropdownMenuItem
    onClick={() => router.push("/admin")}
    className="group cursor-pointer rounded-xl px-3 py-2.5 text-white/70 outline-none transition-all duration-200 focus:bg-white/10 focus:text-white"
  >
    <div className="mr-3 flex size-8 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-orange-500/10">
      <User className="size-4 text-white/60 group-hover:text-orange-400" />
    </div>

    <div className="flex flex-col">
      <span className="text-sm font-medium">View Profile</span>
      
    </div>
  </DropdownMenuItem>

  {/* Settings */}
  <DropdownMenuItem
    onClick={() => router.push("/admin/settings")}
    className="group cursor-pointer rounded-xl px-3 py-2.5 text-white/70 outline-none transition-all duration-200 focus:bg-white/10 focus:text-white"
  >
    <div className="mr-3 flex size-8 items-center justify-center rounded-lg bg-white/5 transition-colors group-hover:bg-orange-500/10">
      <Settings className="size-4 text-white/60 group-hover:text-orange-400" />
    </div>

    <div className="flex flex-col">
      <span className="text-sm font-medium">Settings</span>
     
    </div>
  </DropdownMenuItem>

  <DropdownMenuSeparator className="my-2 bg-white/10" />

  {/* Logout */}
  <DropdownMenuItem
    onClick={handleLogout}
    disabled={loggingOut}
    variant="destructive"
    className="cursor-pointer rounded-xl px-3 py-2.5 text-red-400 outline-none transition-all duration-200 focus:bg-red-500/10 focus:text-red-400"
  >
    <div className="mr-3 flex size-8 items-center justify-center rounded-lg bg-red-500/10">
      <LogOut className="size-4" />
    </div>

    <div className="flex flex-col">
      <span className="text-sm font-medium">
        {loggingOut ? "Logging out..." : "Log out"}
      </span>

    </div>
  </DropdownMenuItem>
</DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
