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
import React, { useEffect, useState } from "react";
import { detectPlatform } from "@/lib/detectPlatform";
import { toast } from "sonner";

type LinkItem = {
  id: string;
  title: string; // maps to label in DB
  url: string;
  visible: boolean;
  platform?: string | null;
  isNew?: boolean; // ✅ identify new unsaved links
};

function platformBadge(platform: string | null | undefined) {
  if (!platform) return null;

  const map: Record<string, { label: string; icon: JSX.Element }> = {
    twitter: { label: "Twitter / X", icon: <Twitter size={14} /> },
    instagram: { label: "Instagram", icon: <Instagram size={14} /> },
    tiktok: { label: "TikTok", icon: <Music size={14} /> },
    youtube: { label: "YouTube", icon: <Youtube size={14} /> },
    facebook: { label: "Facebook", icon: <Facebook size={14} /> },
    linkedin: { label: "LinkedIn", icon: <Linkedin size={14} /> },
    website: { label: "Website", icon: <Globe size={14} /> },
  };

  const item = map[platform] ?? { label: platform, icon: <Globe size={14} /> };

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
  const [message, setMessage] = useState<string | null>(null);

  // 🔹 Fetch existing links from /api/links when component mounts
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/links");
        if (!res.ok) return;
        const data = await res.json();

        // Map DB links to our structure
        const mapped: LinkItem[] = data.map((l: any) => ({
          id: l.id,
          title: l.label,
          url: l.url,
          visible: l.visible,
          platform: l.platform,
          isNew: false, // ✅ existing link
        }));

        setLinks(mapped);
      } catch (err) {
        console.error(err);
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
        isNew: true, // ✅ mark new links
      },
    ]);
  };

const deleteLink = async (id: string) => {
  if (!confirm("Are you sure you want to delete this link?")) return;

  try {
    // instantly remove from UI
    

    // 🔥 simple Prisma style call to backend
    const res = await fetch(`/api/links/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }), // pass id in body like your prisma example
    });

    if (!res.ok) {
      console.error("Failed to delete from database");
      const msg = setMessage("❌ Failed to delete link from database")
      
      return;
    }
    setLinks((prev) => prev.filter((l) => l.id !== id));
    setMessage("✅ Link deleted successfully");
  } catch (error) {
    console.error("Delete error:", error);
    setMessage("⚠️ Network error while deleting");
  }
};





  // ✅ Only save new links
  const saveLinks = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const newLinks = links.filter((link) => link.isNew);

      if (newLinks.length === 0) {
        setMessage("No new links to save ✅");
        setSaving(false);
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

      // ✅ Mark all newly saved as not new
      setLinks((prev) =>
        prev.map((l) => (l.isNew ? { ...l, isNew: false } : l))
      );

      setMessage("");
      toast.success("New links saved successfully ✅")
    } catch (err: any) {
      console.error(err);
      setMessage("Failed to save links ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex gap-8 w-3xl  mx-auto p-6 ">
      {/* Left side – editor */}
      <div className="flex-1  rounded-2xl shadow p-6   ">
        <div className="flex items-center justify-between mb-4 ">
          <h2 className="text-lg font-semibold">My Links</h2>
          <div className="flex gap-3 justify-center items-center flex-row">
                <button
            onClick={addLink}
            className="rounded-full px-4 py-2 text-sm font-medium border hover:bg-gray-50 hover:text-black cursor-pointer"
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
          <p className="text-xs text-gray-500 mb-2">Loading your links…</p>
        )}

        <div className="space-y-4 overflow-y-auto flex flex-col-reverse gap-3">
          {links.map((link) => {
            const detected = detectPlatform(link.url);
            return (
              <div
                key={link.id}
                className="rounded-xl border  p-4 flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {platformBadge(detected)}
                    {link.isNew && (
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        (new)
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Visibility toggle */}
                  
                   

                    <button
                      onClick={() => deleteLink(link.id)}
                      className="text-red-500 hover:opacity-80"
                    >
                      <Trash className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    value={link.title}
                    onChange={(e) =>
                      updateLink(link.id, { title: e.target.value })
                      
                    }
                    required
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                    placeholder="Follow me on Twitter!!"
                  />
                </div>

                {/* URL */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-600">
                    URL
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) =>
                      updateLink(link.id, { url: e.target.value })
                    }
                    className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black/80"
                    placeholder="https://example.com"
                    required
                  />
                </div>
              </div>
            );
          })}

          {links.length === 0 && !loading && (
            <p className="text-sm text-gray-500">
              No links yet. Click “Add link” to create one.
            </p>
          )}

         

        
        </div>
      </div>
    </div>
  );
}
