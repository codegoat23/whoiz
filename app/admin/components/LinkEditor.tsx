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
    <div className="flex gap-8 w-3xl mx-auto p-6">
      <div className="flex-1 rounded-2xl shadow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Links</h2>

          <div className="flex gap-3 items-center">
            <button
              onClick={addLink}
              className="rounded-full px-4 py-2 text-sm border hover:bg-gray-50"
            >
              + Add link
            </button>

            <Button
              disabled={saving || links.length === 0}
              onClick={saveLinks}
            >
              {saving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        {loading && (
          <p className="text-xs text-gray-500">Loading your links…</p>
        )}

        <div className="space-y-4 flex flex-col-reverse">
          {links.map((link) => {
            const detected = detectPlatform(link.url);

            return (
              <div key={link.id} className="border rounded-xl p-4 space-y-3">
                {/* Top row */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {platformBadge(detected)}
                    {link.isNew && (
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        new
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => deleteLink(link.id)}
                    className="text-red-500"
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
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />

                {/* URL */}
                <input
                  value={link.url}
                  onChange={(e) =>
                    updateLink(link.id, { url: e.target.value })
                  }
                  placeholder="https://example.com"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            );
          })}

          {!links.length && !loading && (
            <p className="text-sm text-gray-500">
              No links yet. Click “Add link”.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}