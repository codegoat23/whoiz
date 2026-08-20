"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { toast } from "sonner";
import { Link as LinkIcon, ExternalLink, Trash2, Pencil } from "lucide-react";

import {
  PLATFORMS,
  normalizeHandle,
  buildSocialUrl,
  extractHandleFromUrl,
  validateHandle,
  getPlatform,
} from "@/lib/social-platforms";

export default function ConnectPage({
  initialSocials,
}: {
  initialSocials: { id: string; platform: string; url: string }[];
}) {
  // Build initial state from server data
  const initialHandles: Record<string, string> = {};
  const initialConnected: Record<string, { id: string; url: string }> = {};

  initialSocials.forEach((item) => {
    const handle = extractHandleFromUrl(item.platform, item.url);
    initialHandles[item.platform] = handle ?? item.url;
    initialConnected[item.platform] = { id: item.id, url: item.url };
  });

  const [handles, setHandles] = useState<Record<string, string>>(initialHandles);
  const [connected, setConnected] = useState<Record<string, { id: string; url: string }>>(initialConnected);
  const [editing, setEditing] = useState<Record<string, boolean>>({});
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null);

  const isConnected = (key: string) => !!connected[key];
  const isEditing = (key: string) => !!editing[key];

  function getPreviewUrl(platformKey: string): string | null {
    const handle = handles[platformKey];
    if (!handle) return null;
    return buildSocialUrl(platformKey, handle);
  }

  function startEdit(platformKey: string) {
    setEditing((prev) => ({ ...prev, [platformKey]: true }));
  }

  function cancelEdit(platformKey: string) {
    // Restore handle from connected state
    const existing = connected[platformKey];
    if (existing) {
      const platform = getPlatform(platformKey);
      const handle = platform ? extractHandleFromUrl(platformKey, existing.url) : null;
      setHandles((prev) => ({ ...prev, [platformKey]: handle ?? "" }));
    }
    setEditing((prev) => ({ ...prev, [platformKey]: false }));
  }

  async function save(platformKey: string) {
    const rawHandle = handles[platformKey] ?? "";
    const handle = normalizeHandle(rawHandle);

    const error = validateHandle(platformKey, handle);
    if (error) {
      toast.error(error);
      return;
    }

    const url = buildSocialUrl(platformKey, handle);
    if (!url) {
      toast.error("Could not generate URL");
      return;
    }

    try {
      setLoadingPlatform(platformKey);

      const res = await fetch("/api/social-connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platformKey, url }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");

      setConnected((prev) => ({
        ...prev,
        [platformKey]: { id: data.data.id, url },
      }));
      setEditing((prev) => ({ ...prev, [platformKey]: false }));

      toast.success(`${getPlatform(platformKey)?.label ?? platformKey} connected`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlatform(null);
    }
  }

  async function remove(platformKey: string) {
    const existing = connected[platformKey];
    if (!existing) return;

    try {
      setLoadingPlatform(platformKey);

      const res = await fetch("/api/social-connect", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform: platformKey }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove");

      setConnected((prev) => {
        const next = { ...prev };
        delete next[platformKey];
        return next;
      });
      setHandles((prev) => ({ ...prev, [platformKey]: "" }));
      setEditing((prev) => ({ ...prev, [platformKey]: false }));

      toast.success(`${getPlatform(platformKey)?.label ?? platformKey} removed`);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingPlatform(null);
    }
  }

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
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
          const connectedState = isConnected(p.key);
          const editingState = isEditing(p.key);
          const loading = loadingPlatform === p.key;
          const previewUrl = getPreviewUrl(p.key);
          const handleValue = handles[p.key] ?? "";

          return (
            <Card
              key={p.key}
              className="
                group relative flex min-h-[260px] flex-col
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
                style={{ color: p.color }}
              >
                <Icon size={22} />
              </div>

              {/* HEADER */}
              <div className="pr-14">
                <h2 className="text-base font-semibold tracking-tight text-white">
                  {p.label}
                </h2>
                <p className="mt-1 text-xs text-white/35">
                  {connectedState && !editingState
                    ? "Your account is connected"
                    : "Enter your handle to connect"}
                </p>
              </div>

              {/* CONNECTED STATE */}
              {connectedState && !editingState ? (
                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-emerald-400">
                      Connected
                    </span>
                  </div>

                  {/* Preview URL */}
                  <a
                    href={connected[p.key].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition truncate max-w-full"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{connected[p.key].url}</span>
                  </a>

                  {/* ACTIONS */}
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-6">
                    <a
                      href={connected[p.key].url}
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

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => startEdit(p.key)}
                        className="
                          flex-1 h-10 rounded-xl
                          border-white/10
                          bg-white/[0.04]
                          text-xs font-medium
                          text-white
                          hover:border-white/20
                          hover:bg-white/[0.08]
                        "
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => remove(p.key)}
                        disabled={loading}
                        className="
                          flex-1 h-10 rounded-xl
                          border-red-500/20
                          bg-red-500/[0.04]
                          text-xs font-medium
                          text-red-400
                          hover:border-red-500/30
                          hover:bg-red-500/[0.08]
                          disabled:opacity-50
                        "
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 flex flex-1 flex-col gap-3">
                  {/* HANDLE INPUT */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm pointer-events-none">
                      @
                    </div>
                    <Input
                      placeholder={`Your ${p.label} handle`}
                      value={handleValue}
                      onChange={(e) => {
                        const val = e.target.value;
                        setHandles((prev) => ({ ...prev, [p.key]: val }));
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") save(p.key);
                      }}
                      className="
                        h-10 pl-7
                        rounded-xl
                        border-white/10
                        bg-black/20
                        text-sm text-white
                        placeholder:text-white/25
                        focus:border-white/25
                        focus:ring-0
                      "
                    />
                  </div>

                  {/* URL PREVIEW */}
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition truncate max-w-full"
                    >
                      <LinkIcon className="h-3 w-3 shrink-0" />
                      <span className="truncate">{previewUrl}</span>
                    </a>
                  )}

                  {/* BUTTONS */}
                  <div className="mt-auto flex gap-2">
                    {editingState && (
                      <Button
                        variant="outline"
                        onClick={() => cancelEdit(p.key)}
                        className="
                          flex-1 h-10 rounded-xl
                          border-white/10
                          bg-white/[0.04]
                          text-xs font-medium
                          text-white/60
                          hover:border-white/20
                          hover:bg-white/[0.08]
                        "
                      >
                        Cancel
                      </Button>
                    )}

                    <Button
                      disabled={loading || !handleValue.trim()}
                      onClick={() => save(p.key)}
                      className="
                        flex-1 h-10
                        rounded-xl
                        font-semibold
                        text-black
                        transition-all duration-300
                        hover:scale-[1.01]
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                      "
                      style={{
                        background: `linear-gradient(135deg, ${p.color}, ${p.color}90)`,
                        boxShadow: `0 8px 25px ${p.color}20`,
                      }}
                    >
                      {loading
                        ? "Saving..."
                        : editingState
                        ? "Update"
                        : "Connect"}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
