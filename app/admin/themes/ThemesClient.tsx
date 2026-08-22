"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Check, Plus, Loader2 } from "lucide-react";

import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";
import { updateCardTheme } from "./actions";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomThemeUploader from "./ThemeUploader";

type ThemesClientProps = {
  initialTheme: CardThemeId;
};

type SaveStatus = "idle" | "saving" | "saved" | "error";

export function ThemesClient({ initialTheme }: ThemesClientProps) {
  const [selected, setSelected] = useState<CardThemeId>(initialTheme);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [openCustom, setOpenCustom] = useState(false);
  const saveRequestCounter = useRef(0);
  const hideSavedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const themes = Object.entries(CARD_THEMES) as [
    CardThemeId,
    (typeof CARD_THEMES)[CardThemeId]
  ][];

  const persistTheme = useCallback((themeId: CardThemeId) => {
    if (themeId === "custom") return;

    const requestId = ++saveRequestCounter.current;

    setSaveStatus("saving");

    if (hideSavedTimer.current) {
      clearTimeout(hideSavedTimer.current);
      hideSavedTimer.current = null;
    }

    updateCardTheme(themeId)
      .then(() => {
        if (requestId !== saveRequestCounter.current) return;
        setSaveStatus("saved");
        hideSavedTimer.current = setTimeout(() => setSaveStatus("idle"), 2500);
      })
      .catch(() => {
        if (requestId !== saveRequestCounter.current) return;
        setSaveStatus("error");
      });
  }, []);

  const handleSelect = (id: CardThemeId) => {
    setSelected(id);
    persistTheme(id);
  };

  return (
    <div className="relative space-y-6 p-2">

      {/* BACKDROP AURA */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[160px] rounded-full" />
      </div>
      <div className="flex items-center gap-3">
  <span className="h-3 w-3 rounded-full bg-orange-500 shrink-0" />
  
  <h2 className="text-xl font-semibold">
    Card Picture
  </h2>
</div>

      {/* STATUS BAR */}
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-white/40 text-center sm:text-left">
          {selected === "custom"
            ? "Custom theme is active"
            : "Pick a theme — it saves automatically"}
        </p>

        <div className="flex items-center gap-1.5 text-xs transition-all duration-300">
          {saveStatus === "saving" && (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-white/50" />
              <span className="text-white/50">Saving...</span>
            </>
          )}
          {saveStatus === "saved" && (
            <span className="text-emerald-400/80">✓ Saved</span>
          )}
          {saveStatus === "error" && (
            <span className="text-red-400/80">Couldn't save</span>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

        {themes.map(([id, theme]) => {
          const isActive = selected === id;
          const isCustom = id === "custom";

          if (isCustom) {
            return (
             <button
  key={id}
  type="button"
  onClick={() => setOpenCustom(true)}
  className={`
    group relative overflow-hidden rounded-2xl border-2 border-dashed
    transition-all duration-300
    hover:-translate-y-1 hover:shadow-lg
    ${
      isActive
        ? "border-white/80 bg-white/10 scale-[1.03]"
        : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/[0.08]"
    }
  `}
>
  <div className="relative aspect-[4/3] flex flex-col items-center justify-center gap-3">
    <div
      className="
        flex h-12 w-12 items-center justify-center rounded-full
        bg-white/10
        transition-all duration-300
        group-hover:bg-white/15
      "
    >
      <Plus className="h-5 w-5 text-white/70 transition-transform group-hover:scale-110 group-hover:text-white" />
    </div>

    <span className="text-xs font-medium text-white/60 transition-colors group-hover:text-white/80">
      Upload your own
    </span>
  </div>

  <div className="flex items-center justify-between px-3 py-2 text-xs text-white/70">
    <span className="truncate">Custom</span>

    {isActive && (
      <div className="flex items-center gap-1">
        <Check className="h-3 w-3 text-white/80" />
        <span className="text-[10px] text-white/60">Active</span>
      </div>
    )}
  </div>
</button>
            );
          }

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelect(id)}
              className={`
                group relative overflow-hidden rounded-2xl border transition-all duration-300
                bg-white/5 backdrop-blur-xl
                hover:-translate-y-1 hover:shadow-lg
                ${
                  isActive
                    ? "border-white/20 scale-[1.03]"
                    : "border-border hover:border-orange-400/40"
                }
              `}
            >
              {/* IMAGE */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={theme.cardBgImage}
                  alt={theme.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* ACTIVE OVERLAY */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white text-xs font-medium">
                      <Check className="w-4 h-4 text-orange-400" />
                      Selected
                    </div>
                  </div>
                )}
              </div>

              {/* LABEL */}
              <div className="px-3 py-2 flex items-center justify-between text-xs text-white/70">
                <span className="truncate">{theme.label}</span>
                <span
                  className="w-3 h-3 rounded-full shadow-inner"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* CUSTOM THEME DIALOG */}
      <Dialog open={openCustom} onOpenChange={setOpenCustom}>
        <DialogContent className="bg-popover border border-border backdrop-blur-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">
              Custom Theme Studio
            </DialogTitle>
          </DialogHeader>

          <CustomThemeUploader
            onDone={() => {
              setSelected("custom");
              setOpenCustom(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
