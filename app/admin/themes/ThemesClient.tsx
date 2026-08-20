"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";
import { updateCardTheme } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomThemeUploader from "./ThemeUploader";
import { toast } from "sonner";

type ThemesClientProps = {
  initialTheme: CardThemeId;
};

export function ThemesClient({ initialTheme }: ThemesClientProps) {
  const [selected, setSelected] = useState<CardThemeId>(initialTheme);
  const [isPending, startTransition] = useTransition();
  const [openCustom, setOpenCustom] = useState(false);

  const themes = Object.entries(CARD_THEMES) as [
    CardThemeId,
    (typeof CARD_THEMES)[CardThemeId]
  ][];

  const handleSave = () => {
    if (selected === "custom") return;

    startTransition(() => {
      updateCardTheme(selected)
        .then(() => {
          toast.success("Theme updated successfully");
        })
        .catch(() => {
          toast.error("Failed to update theme");
        });
    });
  };

  return (
    <div className="relative space-y-6 p-2">

      {/* BACKDROP AURA */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] blur-[160px] rounded-full" />
      </div>

      {/* APPLY BUTTON - TOP */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/40 text-center sm:text-left">
          {selected === "custom"
            ? "Custom theme is active"
            : "Select a theme below, then apply"}
        </p>

        <Button
          onClick={handleSave}
          disabled={isPending || selected === "custom"}
          className="
            min-w-[160px] rounded-xl font-semibold
            bg-orange-500
            text-white
            transition-all duration-300
            hover:bg-orange-600
            disabled:opacity-50
          "
        >
          {isPending ? "Applying..." : "Apply Theme"}
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

        {themes.map(([id, theme]) => {
          const isActive = selected === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                if (id === "custom") {
                  setOpenCustom(true);
                } else {
                  setSelected(id);
                }
              }}
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
              toast.success("Custom theme applied");
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
