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
  className="
    group
    relative
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-gradient-to-b
    from-white/[0.08]
    to-white/[0.02]
    backdrop-blur-xl
    p-6
    transition-all
    duration-300
    hover:scale-[1.02]
    hover:border-white/20
    hover:shadow-2xl
  "
>
  {/* Glow Effect */}
  <div
    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
    style={{
      background: `radial-gradient(circle at top right, ${p.color}25, transparent 60%)`,
    }}
  />



  {/* ICON */}
  <div
    className="absolute top-5 right-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 backdrop-blur-md"
    style={{
      background: `${p.color}15`,
      boxShadow: `0 0 30px ${p.color}30`,
      color: p.color,
    }}
  >
    <p.icon size={28} />
  </div>

  {/* TITLE */}
  <h2 className="text-lg font-semibold text-white tracking-tight">
    {p.label}
  </h2>

  {isConnected(p.key) && !isEditing(p.key) ? (
    <div className="mt-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <p className="text-sm text-emerald-400 font-medium">
          Connected
        </p>
      </div>

      <a
        href={links[p.key]}
        target="_blank"
        className="text-sm text-zinc-400 hover:text-white transition"
      >
        View profile →
      </a>

      <Button
        variant="outline"
        className="
          border-white/10
          bg-white/5
          hover:bg-white/10
          text-white
        "
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
    <div className="mt-5 space-y-3">
      <Input
        placeholder={`Enter ${p.label} URL`}
        value={links[p.key] || ""}
        onChange={(e) =>
          setLinks((prev) => ({
            ...prev,
            [p.key]: e.target.value,
          }))
        }
        className="
          bg-black/20
          border-white/10
          text-white
          focus:border-white/30
        "
      />

      <Button
        disabled={loadingPlatform === p.key}
        className="
          w-full
          text-white
          font-medium
          border-0
          shadow-lg
        "
        style={{
          background: `linear-gradient(135deg, ${p.color}, ${p.color}90)`,
          boxShadow: `0 10px 30px ${p.color}40`,
        }}
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