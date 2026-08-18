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
  { key: "x", label: "X (Twitter)", icon: SiX, color: "#fff" },
  { key: "github", label: "GitHub", icon: FaGithub, color: "#333" },
  { key: "linkedin", label: "LinkedIn", icon: FaLinkedin, color: "#0A66C2" },
  { key: "tiktok", label: "TikTok", icon: FaTiktok, color: "#fff" },
];

export default function ConnectPage({
 
  initialSocials,
}: {
  
  initialSocials: { platform: string; url: string }[];
}) {
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
        body: JSON.stringify({  platform, url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success(`${platform} connected ✨`);

      setEditing((prev) => ({ ...prev, [platform]: false }));
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlatform(null);
    }
  };

  const isConnected = (key: string) => !!links[key];
  const isEditing = (key: string) => editing[key];

  return (
    <div className="min-h-screen px-6 py-10 relative">

   

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-white">
          Connect Your Universe
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Link your platforms into a unified identity network
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">

       {PLATFORMS.map((p) => {
  const Icon = p.icon;
  const connected = isConnected(p.key);
  const editing = isEditing(p.key);
  const loading = loadingPlatform === p.key;

  return (
    <Card
      key={p.key}
      className="
        group relative flex min-h-[230px] flex-col
        overflow-hidden rounded-3xl
        border border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-xl
        transition-all duration-300
        hover:border-white/15
        hover:bg-white/[0.06]
      "
    >
      {/* PLATFORM ICON */}
      <div
        className="
          absolute right-5 top-5
          flex h-11 w-11
          items-center justify-center
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          transition-transform duration-300
          group-hover:scale-105
        "
        style={{
          color: p.color,
        }}
      >
        <Icon size={22} />
      </div>

      {/* HEADER */}
      <div className="pr-14">
        <h2 className="text-base font-semibold tracking-tight text-white">
          {p.label}
        </h2>

        <p className="mt-1 text-xs text-white/35">
          {connected ? "Your account is connected" : "Connect your account"}
        </p>
      </div>

      {/* CONTENT */}
      {connected && !editing ? (
        <div className="mt-6 flex flex-1 flex-col">
          {/* STATUS */}
          <div className="flex items-center gap-2">
            

            <span className="text-sm font-medium text-emerald-400">
              Connected
            </span>
          </div>

          {/* ACTIONS */}
          <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
            <a
              href={links[p.key]}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex h-10 items-center justify-center
                rounded-xl
                border border-white/10
                bg-white/[0.04]
                px-3
                text-xs font-medium
                text-white/60
                transition
                hover:border-white/20
                hover:bg-white/[0.08]
                hover:text-white
              "
            >
              Open profile
            </a>

            <Button
              variant="outline"
              onClick={() =>
                setEditing((prev) => ({
                  ...prev,
                  [p.key]: true,
                }))
              }
              className="
                h-10 rounded-xl
                border-white/10
                bg-white/[0.04]
                text-xs font-medium
                text-white
                hover:border-white/20
                hover:bg-white/[0.08]
              "
            >
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-1 flex-col">
          {/* URL INPUT */}
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
              h-10
              rounded-xl
              border-white/10
              bg-black/20
              text-sm text-white
              placeholder:text-white/25
              focus:border-white/25
              focus:ring-0
            "
          />

          {/* SAVE */}
          <Button
            disabled={loading}
            onClick={() => save(p.key)}
            className="
              mt-auto h-10 w-full
              rounded-xl
              font-semibold
              text-black
              transition-all duration-300
              hover:scale-[1.01]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
            style={{
              background: `linear-gradient(
                135deg,
                ${p.color},
                ${p.color}90
              )`,
              boxShadow: `0 8px 25px ${p.color}20`,
            }}
          >
            {loading
              ? "Saving..."
              : connected
              ? "Update"
              : "Connect"}
          </Button>
        </div>
      )}
    </Card>
  );
})}
      </div>
    </div>
  );
}