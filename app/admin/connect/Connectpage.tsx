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
        body: JSON.stringify({ userId, platform, url }),
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

      {/* 🌅 BACKGROUND GLOW FIELD */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/10 blur-[180px] rounded-full" />
      </div>

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

          return (
            <Card
              key={p.key}
              className="
                group relative overflow-hidden
                rounded-3xl p-6
                border border-white/10
                bg-white/5 backdrop-blur-xl
                transition-all duration-300
                hover:-translate-y-1
                hover:border-white/20
                hover:shadow-[0_20px_80px_-30px_rgba(255,120,0,0.25)]
              "
            >
              {/* ENERGY GLOW */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
                style={{
                  background: `radial-gradient(circle at top right, ${p.color}20, transparent 60%)`,
                }}
              />

              {/* ICON NODE */}
              <div
                className="
                  absolute top-5 right-5
                  flex h-14 w-14 items-center justify-center
                  rounded-2xl border border-white/10
                  backdrop-blur-md transition
                "
                style={{
                  background: `${p.color}15`,
                  boxShadow: `0 0 25px ${p.color}25`,
                  color: p.color,
                }}
              >
                <Icon size={26} />
              </div>

              {/* TITLE */}
              <h2 className="text-white text-lg font-semibold tracking-tight">
                {p.label}
              </h2>

              {/* STATUS */}
              {isConnected(p.key) && !isEditing(p.key) ? (
                <div className="mt-5 space-y-4">

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm text-emerald-400 font-medium">
                      Connected
                    </p>
                  </div>

                  <a
                    href={links[p.key]}
                    target="_blank"
                    className="text-sm text-white/40 hover:text-white transition"
                  >
                    Open profile →
                  </a>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setEditing((prev) => ({ ...prev, [p.key]: true }))
                    }
                    className="
                      w-full rounded-xl
                      bg-white/5 border-white/10
                      text-white hover:bg-white/10
                    "
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
                      bg-black/20 border-white/10
                      text-white placeholder:text-white/30
                      focus:border-white/30 focus:ring-white/10
                      rounded-xl
                    "
                  />

                  <Button
                    disabled={loadingPlatform === p.key}
                    onClick={() => save(p.key)}
                    className="
                      w-full rounded-xl font-semibold
                      text-black
                      transition-all duration-300
                      shadow-lg
                    "
                    style={{
                      background: `linear-gradient(135deg, ${p.color}, ${p.color}90)`,
                      boxShadow: `0 10px 30px ${p.color}30`,
                    }}
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
          );
        })}
      </div>
    </div>
  );
}