"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchCommand } from "@/components/SearchCommand";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "@/lib/auth-client";
import { LogOut, User, ChevronDown } from "lucide-react";
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
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-3 border-b border-white/5 bg-background/80 backdrop-blur-xl px-4">
      <SidebarTrigger className="text-white/60 hover:text-white" />
      <div className="flex-1" />
      <SearchCommand />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Open user menu"
            className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-background"
          >
            <Avatar className="size-8">
              <AvatarImage src={user?.avatarUrl ?? undefined} alt={user?.name ?? ""} />
              <AvatarFallback className="bg-white/10 text-xs font-medium text-white/80">
                {initials}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="hidden size-3.5 text-white/40 sm:block" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-56"
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              {user?.email && (
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              )}
              {user?.username && (
                <p className="text-xs leading-none text-muted-foreground">
                  @{user.username}
                </p>
              )}
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push(`/${user?.username}`)}>
            <User className="mr-2 size-4" />
            View Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            disabled={loggingOut}
            variant="destructive"
          >
            <LogOut className="mr-2 size-4" />
            {loggingOut ? "Logging out..." : "Log out"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
