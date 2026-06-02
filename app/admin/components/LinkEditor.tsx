"use client";

import { Button } from "@/components/ui/button";
import {
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Music,
  Trash,
  Twitter,
  Youtube,
} from "lucide-react";
import React, { useEffect, useState, ReactNode } from "react";
import { detectPlatform } from "@/lib/detectPlatform";
import { toast } from "sonner";

type LinkItem = {
  id: string;
  title: string;
  url: string;
  visible: boolean;
  platform?: string | null;
  isNew?: boolean;
};

function platformBadge(platform: string | null | undefined) {
  if (!platform) return null;

  const map: Record<string, { label: string; icon: ReactNode }> = {
    twitter: { label: "Twitter / X", icon: <Twitter size={14} /> },
    instagram: { label: "Instagram", icon: <Instagram size={14} /> },
    tiktok: { label: "TikTok", icon: <Music size={14} /> },
    youtube: { label: "YouTube", icon: <Youtube size={14} /> },
    facebook: { label: "Facebook", icon: <Facebook size={14} /> },
    linkedin: { label: "LinkedIn", icon: <Linkedin size={14} /> },
    website: { label: "Website", icon: <Globe size={14} /> },
  };

  const item = map[platform] ?? {
    label: platform,
    icon: <Globe size={14} />,
  };

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-700">
      {item.icon}
      <span>{item.label}</span>
    </span>
  );
}

export default function LinkEditor() {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // 🔹 Fetch links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/links");
        if (!res.ok) return;

        const data = await res.json();

        const mapped: LinkItem[] = data.map((l: any) => ({
          id: l.id,
          title: l.label,
          url: l.url,
          visible: l.visible,
          platform: l.platform,
          isNew: false,
        }));

        setLinks(mapped);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load links");
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const updateLink = (id: string, data: Partial<LinkItem>) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...data } : link))
    );
  };

  const addLink = () => {
    const id = crypto.randomUUID();

    setLinks((prev) => [
      ...prev,
      {
        id,
        title: "",
        url: "",
        visible: true,
        platform: null,
        isNew: true,
      },
    ]);
  };

  // 🔥 FIXED DELETE (clean + optimistic UI)
  const deleteLink = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    const previous = links;

    // optimistic update
    setLinks((prev) => prev.filter((l) => l.id !== id));

    try {
      const res = await fetch(`/api/links/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed");
      }

      toast.success("Link deleted");
    } catch (error) {
      // rollback
      setLinks(previous);
      toast.error("Failed to delete link");
      console.error(error);
    }
  };

  // 🔹 Save only new links
  const saveLinks = async () => {
    try {
      setSaving(true);

      const newLinks = links.filter((l) => l.isNew);

      if (newLinks.length === 0) {
        toast.info("No new links to save");
        return;
      }

      await Promise.all(
        newLinks.map((link) =>
          fetch("/api/links", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              label: link.title,
              url: link.url,
              visible: link.visible,
            }),
          })
        )
      );

      setLinks((prev) =>
        prev.map((l) => (l.isNew ? { ...l, isNew: false } : l))
      );

      toast.success("Links saved successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save links");
    } finally {
      setSaving(false);
    }
  };

return (
  <div className="min-h-screen w-full  px-4 py-10">
    
    <div className="max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        
        <div>
          <h2 className="text-xl font-semibold text-orange-300">
            My Links
          </h2>
          <p className="text-sm text-white/50">
            Your digital identity, glowing in the dark
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={addLink}
            className="
              rounded-xl px-4 py-2 text-sm
              border border-white/10
              bg-white/5 hover:bg-white/10
              text-white/70
              transition
            "
          >
            + Add link
          </button>

          <Button
            disabled={saving || links.length === 0}
            onClick={saveLinks}
            className="
              rounded-xl font-semibold
              bg-gradient-to-r from-orange-500 to-amber-400
              text-black
              shadow-[0_0_25px_rgba(255,140,0,0.25)]
              hover:from-orange-400 hover:to-amber-300
              transition-all
            "
          >
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </div>

      {/* Main container */}
      <div className="
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-[0_0_60px_-20px_rgba(255,140,0,0.15)]
        p-4 sm:p-6
      ">
        
        {loading && (
          <p className="text-xs text-white/40 mb-4">
            Loading your links…
          </p>
        )}

        {/* List */}
        <div className="space-y-4 flex flex-col-reverse gap-2">
          {links.map((link) => {
            const detected = detectPlatform(link.url);

            return (
              <div
                key={link.id}
                className="
                  group rounded-2xl
                  border border-white/10
                  bg-black/40
                  hover:bg-black/60
                  transition
                  p-4 sm:p-5 space-y-3
                "
              >
                
                {/* Top row */}
                <div className="flex justify-between items-center">
                  
                  <div className="flex items-center gap-2">
                    {platformBadge(detected)}

                    {link.isNew && (
                      <span className="
                        text-[10px] px-2 py-0.5 rounded-full
                        bg-orange-500/10 text-orange-300
                        border border-orange-500/20
                      ">
                        new
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteLink(link.id)}
                    className="
                      text-white/40 hover:text-orange-300
                      opacity-70 group-hover:opacity-100 transition
                    "
                  >
                    <Trash className="size-5" />
                  </button>
                </div>

                {/* Title */}
                <input
                  value={link.title}
                  onChange={(e) =>
                    updateLink(link.id, { title: e.target.value })
                  }
                  placeholder="Title"
                  className="
                    w-full rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white/80
                    px-3 py-2 text-sm
                    placeholder:text-white/30
                    focus:outline-none
                    focus:ring-2 focus:ring-orange-500/30
                    focus:border-orange-400/40
                  "
                />

                {/* URL */}
                <input
                  value={link.url}
                  onChange={(e) =>
                    updateLink(link.id, { url: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="
                    w-full rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white/80
                    px-3 py-2 text-sm
                    placeholder:text-white/30
                    focus:outline-none
                    focus:ring-2 focus:ring-orange-500/30
                    focus:border-orange-400/40
                  "
                />
              </div>
            );
          })}

          {/* Empty state */}
          {!links.length && !loading && (
            <div className="text-center py-12 text-white/40">
              <div className="text-sm text-white/60">No links yet</div>
              <div className="text-xs mt-1">
                Add your first link and build your glow ✨
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}