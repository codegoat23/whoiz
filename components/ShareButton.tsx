"use client";

import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ username }: { username: string | null }) {
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
          title: "Check this profile",
          text: `Check out ${username}'s profile`,
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
      className="bg-white cursor-pointer rounded-4xl p-5.5"
    >
      <Share2 className="w-4 h-4 mr-1" />
      {copied ? "Copied!" : "Share"}
    </Button>
  );
}