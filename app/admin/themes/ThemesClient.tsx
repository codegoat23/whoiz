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
  const [message, setMessage] = useState<string | null>(null);
  const [openCustom, setOpenCustom] = useState(false);

  const themes = Object.entries(CARD_THEMES) as [
    CardThemeId,
    (typeof CARD_THEMES)[CardThemeId]
  ][];

  const handleSave = () => {
    if (selected === "custom") return; // custom handled by upload

    setMessage(null);
    startTransition(() => {
      updateCardTheme(selected)
        .then(() => {
          setMessage("Theme updated! 🎉 Check your profile page.");
        })
        .catch(() => {
          setMessage("Failed to update theme. Please try again.");
        });
    });
    toast.info(message);
  };

  return (
    <div className="space-y-6 overflow-y-auto p-2">
      {/* THEMES GRID */}
      
      {/* ACTION BAR */}
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs text-muted-foreground">
         
            Click a theme, then hit update to apply it to your profile.
        </div>

        <Button
          onClick={handleSave}
          disabled={isPending || selected === "custom"}
          className="min-w-[130px]"
        >
          {isPending ? "Updating..." : "Use this theme"}
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 ">
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
              className={`relative rounded-2xl overflow-hidden border text-left pb-2 transition group ${
                isActive
                  ? "border-primary ring-2 ring-primary/40 scale-[1.02]"
                  : "border-border hover:border-primary/60"
              }`}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={theme.cardBgImage}
                  alt={theme.label}
                  fill
                  className="object-cover"
                />

                {isActive && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="flex items-center gap-1 text-white text-xs">
                      <Check className="w-4 h-4" />
                      <span>Selected</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-3 pt-2 flex items-center justify-between text-xs">
                <span>{theme.label}</span>
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: theme.accent }}
                />
              </div>
            </button>
          );
        })}
      </div>


      {/* CUSTOM THEME DIALOG */}
      <Dialog open={openCustom} onOpenChange={setOpenCustom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a custom background</DialogTitle>
          </DialogHeader>

          <CustomThemeUploader
            onDone={() => {
              setSelected("custom");
              setMessage("Custom theme applied! 🎨");
              setOpenCustom(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
