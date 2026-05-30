"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";

import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

import { SiX } from "react-icons/si";

const PLATFORMS = [
  { key: "instagram", label: "Instagram", icon: FaInstagram, color: "#E1306C" },
  { key: "facebook", label: "Facebook", icon: FaFacebook, color: "#1877F2" },
  { key: "x", label: "X (Twitter)", icon: SiX, color: "#000000" },
  { key: "github", label: "GitHub", icon: FaGithub, color: "#333" },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
  { key: "tiktok", label: "TikTok", icon: FaTiktok, color: "#111" },
];

export default function ConnectPage({
  userId,
  initialSocials,
}: {
  userId: string;
  initialSocials: { platform: string; url: string }[];
}) {
  // hydrate from server
  const initialLinks: Record<string, string> = {};
  const initialEditing: Record<string, boolean> = {};

  initialSocials.forEach((item) => {
    initialLinks[item.platform] = item.url;
  });

  const [links, setLinks] = useState(initialLinks);
  const [editing, setEditing] = useState(initialEditing);
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const save = async (platform: string) => {
    const url = links[platform];

    if (!url || url.trim() === "") {
      toast.error("Enter a URL first 🚨");
      return;
    }

    try {
      setLoadingPlatform(platform);

      const res = await fetch("/api/social-connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          platform,
          url,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      toast.success(`${platform} connected ✨`);

      setEditing((prev) => ({
        ...prev,
        [platform]: false,
      }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlatform(null);
    }
  };

  const isConnected = (key: string) => !!links[key];
  const isEditing = (key: string) => editing[key];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {PLATFORMS.map((p) => (
        <Card
          key={p.key}
          className="relative p-5 rounded-2xl border bg-black/20 backdrop-blur-md transition hover:scale-[1.03]"
          style={{
            borderColor:  "#333",
            
          }}
        >
          {/* ICON */}
          <div
            className="absolute top-3 right-4 w-12 h-12 flex items-center justify-center rounded-2xl"
            style={{ color: p.color }}
          >
            <p.icon size={36} />
          </div>

          {/* TITLE */}
          <h2 className="text-white font-semibold text-lg">
            {p.label}
          </h2>

          {/* CONNECTED VIEW */}
          {isConnected(p.key) && !isEditing(p.key) ? (
            <div className="mt-4 space-y-3 gap-1 flex flex-col ">
              <p className="text-[#E83718] text-sm">Connected ✓</p>

              <a
                href={links[p.key]}
                target="_blank"
                className="text-sm text-zinc-400 hover:text-white "
              >
                View social →
              </a>

              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5"
                onClick={() =>
                  setEditing((prev) => ({
                    ...prev,
                    [p.key]: true,
                  }))
                }
              >
                Edit
              </Button>
            </div>
          ) : (
            /* INPUT VIEW */
            <div className="mt-4 space-y-3">
              <Input
                placeholder={`Enter ${p.label} URL`}
                value={links[p.key] || ""}
                onChange={(e) =>
                  setLinks((prev) => ({
                    ...prev,
                    [p.key]: e.target.value,
                  }))
                }
                className="bg-black/30 border-white/10 text-white"
              />

              <Button
                className="w-full text-white"
                style={{
                  background: `linear-gradient(135deg, ${p.color}, transparent)`,
                }}
                disabled={loadingPlatform === p.key}
                onClick={() => save(p.key)}
              >
                {loadingPlatform === p.key
                  ? "Saving..."
                  : isConnected(p.key)
                  ? "Update"
                  : "Connect"}
              </Button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}