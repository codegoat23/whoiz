"use client";

import { useEffect } from "react";
import { trackProfileViewed } from "@/lib/analytics";

export default function ProfileViewTracker({ username }: { username: string }) {
  useEffect(() => {
    trackProfileViewed(username);
  }, [username]);

  return null;
}
