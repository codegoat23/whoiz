"use client";

import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Eye, ExternalLink } from "lucide-react";
import Image from "next/image";

interface UserWithUsername {
  username?: string | null;
}

export function FloatingPreview() {
  const { data: session } = useSession();
  const user = session?.user as UserWithUsername | undefined;
  const username = user?.username;

  if (!username) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
      <div className="flex items-center gap-3 rounded-2xl  px-4  shadow-lg  transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 sm:gap-4 sm:px-5 sm:py-3">
        <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
          <Eye className="size-4" />
          <span className="max-w-[120px] truncate">/{username}</span>
        </div>

        <Button
          size="sm"
          className="gap-2 rounded-full bg-white  px-4 py-4 text-sm font-medium text-black shadow-md shadow-orange-500/20 transition-all duration-200 hover:bg-white/80  active:scale-[0.97]"
          asChild
        >
          <a
            href={`/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
               <Image
                        src="/logos/logo2.svg"
                        alt="WHOIZ"
                        width={20}
                        height={20}
                        className="w-6.5 h-6.5"
                      />
            <span className="hidden sm:inline">View Preview</span>
            <span className="sm:hidden">Preview</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
