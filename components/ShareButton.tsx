"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton({
  username,
  iconOnly = false,
}: {
  username: string | null;
  iconOnly?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/${username}`
        : `/${username}`;

    // Native share (mobile magic ✨)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Here's my whoiz",
          text: `WHOIZ ${username}`,
          url,
        });
        return;
      } catch (e) {
        console.log("Share cancelled");
      }
    }

    // Fallback → copy link
    await navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
  onClick={handleShare}
  className={
    iconOnly
      ? "size-12 rounded-full bg-white p-0 cursor-pointer"
      : "rounded-full bg-white px-5 py-2.5 cursor-pointer"
  }
  title="Share"
>
  <Share2 className="size-4" />
  {!iconOnly && (copied ? "Copied!" : "Share")}
</Button>
  );
}