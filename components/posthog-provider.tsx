"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { initPostHog, default as posthog } from "@/lib/posthog";
import { useSession } from "@/lib/auth-client";

interface UserWithId {
  id?: string | null;
}

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user as UserWithId | undefined;
  const userId = user?.id;
  const mountedRef = useRef(false);

  useEffect(() => {
    initPostHog();
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY || !initialized()) return;

    if (userId) {
      if (posthog.get_distinct_id() !== userId) {
        posthog.identify(userId);
      }
    } else {
      if (posthog.get_distinct_id()) {
        posthog.reset();
      }
    }
  }, [userId]);

  useEffect(() => {
    if (!POSTHOG_KEY) return;

    if (mountedRef.current) {
      if (initialized()) {
        posthog.capture("$pageview");
      }
    } else {
      mountedRef.current = true;
    }
  }, [pathname]);

  return <>{children}</>;
}

function initialized() {
  return posthog.get_distinct_id() !== undefined && posthog.get_distinct_id() !== "";
}
