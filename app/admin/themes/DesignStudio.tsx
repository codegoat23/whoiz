"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Undo2,
  Redo2,
  Dices,
  Check,
  Paintbrush,
  Loader2,
  LayoutGrid,
} from "lucide-react";

import { CARD_THEMES, CardThemeId, ThemeDefinition } from "@/lib/cardThemes";
import {
  PROFILE_TEMPLATES,
  ProfileTemplateId,
} from "@/lib/profileTemplates";
import { ProfileUser } from "@/components/profile-templates/types";
import { saveDesignPreferences } from "./actions";
import LivePhonePreview from "./LivePhonePreview";
import CustomThemeUploader from "./ThemeUploader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { trackThemeSelected } from "@/lib/analytics";

// Blurred background image shown behind each template card (public/templates).
const TEMPLATE_IMAGES: Record<ProfileTemplateId, string> = {
  classic: "/templates/classicalminimal.png",
  airbuds: "/templates/audiovault.jpg",
  "cyber-widget": "/templates/cyberwidget.jpg",
  "editorial-bento": "/templates/editorialbento.jpg",
  "pastel-scrapbook": "/templates/pastelscrapbook.jpg",
  "sticker-pop": "/templates/3dsticker.jpg",
};

interface DesignStudioProps {
  user: ProfileUser;
  initialTheme: CardThemeId;
  initialTemplate: ProfileTemplateId;
  customBgImageUrl?: string | null;
}

interface DesignState {
  theme: CardThemeId;
  template: ProfileTemplateId;
  customBgImageUrl?: string | null;
}

export default function DesignStudio({
  user,
  initialTheme,
  initialTemplate,
  customBgImageUrl,
}: DesignStudioProps) {
  const router = useRouter();

  // History stack for Undo / Redo
  const [history, setHistory] = useState<DesignState[]>([
    {
      theme: initialTheme,
      template: initialTemplate,
      customBgImageUrl: customBgImageUrl,
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Current active draft state
  const currentState = history[historyIndex] ?? {
    theme: initialTheme,
    template: initialTemplate,
    customBgImageUrl: customBgImageUrl,
  };

  // Persisted state to track dirty / unsaved changes
  const [persistedState, setPersistedState] = useState<DesignState>({
    theme: initialTheme,
    template: initialTemplate,
    customBgImageUrl: customBgImageUrl,
  });

  const [saving, setSaving] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);
  const [bgPickerOpen, setBgPickerOpen] = useState(false);
  const [templateSheetOpen, setTemplateSheetOpen] = useState(false);

  // Check if draft has unsaved changes
  const hasUnsavedChanges =
    currentState.theme !== persistedState.theme ||
    currentState.template !== persistedState.template ||
    currentState.customBgImageUrl !== persistedState.customBgImageUrl;

  // Push new state to history
  const pushState = useCallback((newState: Partial<DesignState>) => {
    setHistory((prev) => {
      const upToCurrent = prev.slice(0, historyIndex + 1);
      const next: DesignState = {
        theme: newState.theme ?? currentState.theme,
        template: newState.template ?? currentState.template,
        customBgImageUrl:
          newState.customBgImageUrl !== undefined
            ? newState.customBgImageUrl
            : currentState.customBgImageUrl,
      };
      return [...upToCurrent, next];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [currentState, historyIndex]);

  // Undo
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex((prev) => prev - 1);
      toast.info("Undone change");
    }
  }, [historyIndex]);

  // Redo
  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex((prev) => prev + 1);
      toast.info("Redone change");
    }
  }, [historyIndex, history.length]);

  // Keyboard shortcuts for Undo (Ctrl+Z) / Redo (Ctrl+Y or Ctrl+Shift+Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleUndo, handleRedo]);

  // Select Theme
  const handleSelectTheme = (themeId: CardThemeId) => {
    if (themeId === "custom" && !currentState.customBgImageUrl) {
      setOpenCustom(true);
      return;
    }
    pushState({ theme: themeId });
    trackThemeSelected(themeId);
  };

  // Select Template
  const handleSelectTemplate = (templateId: ProfileTemplateId) => {
    pushState({ template: templateId });
  };

  // Shuffle button (Randomizes Theme + Template combo)
  const handleShuffle = () => {
    const themeKeys = Object.keys(CARD_THEMES).filter((t) => t !== "custom") as CardThemeId[];
    const templateKeys = Object.keys(PROFILE_TEMPLATES) as ProfileTemplateId[];

    const randomTheme = themeKeys[Math.floor(Math.random() * themeKeys.length)];
    const randomTemplate = templateKeys[Math.floor(Math.random() * templateKeys.length)];

    pushState({ theme: randomTheme, template: randomTemplate });
    toast.success(`🎲 Shuffled to ${CARD_THEMES[randomTheme].label} + ${PROFILE_TEMPLATES[randomTemplate].name}`);
  };

  // Save changes
  const handleSave = async () => {
    setSaving(true);
    try {
      await saveDesignPreferences({
        themeId: currentState.theme,
        templateId: currentState.template,
      });
      setPersistedState({ ...currentState });
      toast.success("Design preferences saved!");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // All background options (used by the card background picker)
  const allThemes = Object.entries(CARD_THEMES) as [CardThemeId, ThemeDefinition][];

  const allTemplates = Object.values(PROFILE_TEMPLATES);

  return (
    <div className="w-full min-h-screen pb-24 text-white">
      {/* ======================================================
          TOP NAVIGATION BAR (Matching reference image)
          ====================================================== */}
      <header className="sticky top-0 z-30 flex items-center justify-between py-4 px-4 sm:px-6 bg-background/80 backdrop-blur-xl border-b border-border">
        {/* Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-white">Design</h1>
        </div>

        {/* Action Controls: Undo, Redo, Save */}
        <div className="flex items-center gap-3">
          {/* Undo Button */}
          <button
            type="button"
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
            className="size-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90"
          >
            <Undo2 className="size-4" />
          </button>

          {/* Redo Button */}
          <button
            type="button"
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
            className="size-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-90"
          >
            <Redo2 className="size-4" />
          </button>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !hasUnsavedChanges}
            className={`
              flex items-center gap-1.5 px-5 py-2 rounded-full font-bold text-xs transition-all active:scale-95 shadow-md
              ${
                hasUnsavedChanges
                  ? "bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-purple-600/30 animate-pulse"
                  : "bg-white/10 text-white/40 cursor-default"
              }
            `}
          >
            {saving ? (
              <>
                <Loader2 className="size-3.5 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>

          {/* Mobile Template Button (opens bottom sheet) */}
          <button
            type="button"
            onClick={() => setTemplateSheetOpen(true)}
            className="lg:hidden flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full bg-white/10 text-xs font-semibold text-white active:scale-95 transition-all"
          >
            <LayoutGrid className="size-3.5" />
            <span>Template</span>
          </button>
        </div>
      </header>

      {/* ======================================================
          MAIN SPLIT VIEW (Controls Left + Sticky Live Preview Right)
          ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT CONTROLS PANE (Cols 1-7 or 1-8) — hidden on mobile (presented via bottom sheet) */}
        <main className="hidden lg:col-span-7 xl:col-span-7 lg:block space-y-6 lg:border-r lg:border-white/10 lg:pr-8 lg:pl-0">
          
          {/* Subheader: Templates Title + Shuffle Button */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <LayoutGrid className="size-5" />
              <span>Templates</span>
            </h2>

            {/* Shuffle Button */}
            <button
              type="button"
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-xs font-medium text-white/90 hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <Dices className="size-4.5" />
              <span>Shuffle</span>
            </button>
          </div>

          {/* ======================================================
              TEMPLATES GRID (Matching same tall rounded style)
              ====================================================== */}
          <div className="space-y-4 pt-1">
            

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {allTemplates.map((tpl) => {
                  const isActive = currentState.template === tpl.id;

                  return (
                    <div key={tpl.id} className="flex flex-col items-center gap-2 group">
                      <button
                        type="button"
                        onClick={() => handleSelectTemplate(tpl.id)}
                        className={`
                          relative w-full aspect-[4/3] rounded-[22px] overflow-hidden border transition-all duration-300
                          flex flex-col justify-between p-3.5 select-none text-left
                          bg-white/[0.04]
                          ${
                            isActive
                              ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-[1.03] border-white/80 bg-white/10"
                              : "border-white/15 hover:border-white/30 hover:-translate-y-0.5 hover:bg-white/[0.08]"
                          }
                        `}
                      >
                        {/* Blurred background image */}
                        <Image
                          src={TEMPLATE_IMAGES[tpl.id]}
                          alt={tpl.name}
                          fill
                          className="object-cover  scale-110 transition-transform duration-500 group-hover:scale-125"
                        />
                        <div className="absolute inset-0 bg-black/45" />

                        {/* Top Badge & Tag */}
                        <div className="relative z-10 flex items-center justify-between w-full">
                         
                          {isActive && (
                            <span className="size-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                              <Check className="size-3 stroke-[3]" />
                            </span>
                          )}
                        </div>

                        {/* Title & Tagline */}
                        <div className="relative z-10 space-y-0.5">
                         
                        
                        </div>

                      
                      </button>

                      {/* Label */}
                      <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                        {tpl.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

        </main>

        {/* ======================================================
            RIGHT STICKY LIVE PHONE PREVIEW PANE (Cols 8-12)
            ====================================================== */}
        <aside className="flex lg:col-span-5 xl:col-span-5 flex-col items-center py-6 lg:py-0 lg:sticky lg:top-16 lg:max-h-[calc(100vh-6rem)]">
          {/* Status Label (Matching "Unsaved changes" in reference image) */}
          <div className="w-full text-center pb-3 shrink-0">
            <span
              className={`text-xs font-semibold transition-colors duration-300 ${
                hasUnsavedChanges
                  ? "text-amber-400/90 animate-pulse"
                  : "text-white/40"
              }`}
            >
              {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
            </span>
          </div>

          {/* Live Preview (scrollable with slim styled scrollbar) */}
          <div className="w-full flex-1 overflow-y-auto custom-scrollbar pr-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
            <LivePhonePreview
              user={user}
              selectedTheme={currentState.theme}
              selectedTemplate={currentState.template}
              customBgImageUrl={currentState.customBgImageUrl}
              onEditBackground={() => setBgPickerOpen(true)}
            />
          </div>
        </aside>
      </div>

      {/* ======================================================
          MOBILE TEMPLATE SELECTOR BOTTOM SHEET
          ====================================================== */}
      <Sheet open={templateSheetOpen} onOpenChange={setTemplateSheetOpen}>
        <SheetContent
          side="bottom"
          className="bg-zinc-950/95 backdrop-blur-2xl border-t border-white/10 rounded-t-[28px] lg:hidden h-[50%]"
        >
          {/* Handle */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-1.5 w-12 rounded-full bg-white" />

          <SheetHeader className="pt-6  text-left ">
            <SheetTitle className="text-white flex flex-row items-center justify-between gap-2 bg-transparent mt-2">
              <div className=" flex flex-row">
                
              Choose Template
              </div>
               {/* Shuffle Button */}
            <button
              type="button"
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full border border-white/15 bg-white hover:bg-white/15 text-xs font-medium text-black hover:text-white transition-all active:scale-95 shadow-sm"
            >
              <Dices className="size-4.5" />
              <span>Shuffle</span>
            </button>
              
            </SheetTitle>
           
          </SheetHeader>

          {/* Scrollable content */}
          <div className="px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] overflow-y-auto custom-scrollbar [-ms-overflow-style:none] [scrollbar-width:thin] mt-10 ">
            <div className="grid grid-cols-2 gap-4">
              {allTemplates.map((tpl) => {
                const isActive = currentState.template === tpl.id;

                return (
                  <div key={tpl.id} className="flex flex-col items-center gap-2 group">
                    <button
                      type="button"
                      onClick={() => handleSelectTemplate(tpl.id)}
                      className={`
                        relative w-full aspect-[4/3] rounded-[22px] overflow-hidden border transition-all duration-300
                        flex flex-col justify-between p-3 select-none text-left
                        bg-white/[0.04]
                        ${
                          isActive
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-[1.03] border-white/80 bg-white/10"
                            : "border-white/15 hover:border-white/30 active:scale-[0.99]"
                        }
                      `}
                    >
                      <Image
                        src={TEMPLATE_IMAGES[tpl.id]}
                        alt={tpl.name}
                        fill
                        className="object-cover scale-110"
                      />
                      <div className="absolute inset-0 bg-black/45" />

                      <div className="relative z-10 flex items-center justify-end w-full">
                        {isActive && (
                          <span className="size-5 rounded-full bg-white text-black flex items-center justify-center shadow-md">
                            <Check className="size-3 stroke-[3]" />
                          </span>
                        )}
                      </div>
                    </button>

                    <span className="text-xs font-medium text-white/80 group-hover:text-white transition-colors">
                      {tpl.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ======================================================
          CUSTOM THEME UPLOAD DIALOG
          ====================================================== */}
      <Dialog open={openCustom} onOpenChange={setOpenCustom}>
        <DialogContent className="bg-popover border border-border backdrop-blur-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Custom Theme Studio</DialogTitle>
          </DialogHeader>

          <CustomThemeUploader
            onDone={() => {
              pushState({ theme: "custom" });
              setOpenCustom(false);
              setBgPickerOpen(false);
              router.refresh();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* ======================================================
          CARD BACKGROUND PICKER DIALOG
          ====================================================== */}
      <Dialog open={bgPickerOpen} onOpenChange={setBgPickerOpen}>
        <DialogContent className="bg-popover border border-border backdrop-blur-xl rounded-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle className="text-white">Card Picture &amp; Background</DialogTitle>
            <p className="text-xs text-white/60">
              Pick the background image shown for this template.
            </p>
          </DialogHeader>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {allThemes.map(([id, theme]) => {
              const isActive = currentState.theme === id;
              const isCustom = id === "custom";

              if (isCustom) {
                return (
                  <div key={id} className="flex flex-col items-center gap-2 group">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentState.customBgImageUrl) {
                          handleSelectTheme("custom");
                          setBgPickerOpen(false);
                        } else {
                          setOpenCustom(true);
                        }
                      }}
                      className={`
                        relative w-full aspect-[3/4] rounded-[22px] overflow-hidden border transition-all duration-300
                        flex flex-col items-center justify-center p-3
                        ${
                          isActive
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-[1.03] border-white/80 bg-white/10"
                            : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                        }
                      `}
                    >
                      {currentState.customBgImageUrl ? (
                        <>
                          <Image
                            src={currentState.customBgImageUrl}
                            alt="Custom Background"
                            fill
                            className="object-cover"
                          />
                          {isActive && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center">
                              <Check className="size-5 text-white stroke-[3]" />
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 group-hover:scale-110 group-hover:text-white transition-all">
                          <Paintbrush className="size-4 text-white/80" />
                        </div>
                      )}
                    </button>
                    <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                      Custom
                    </span>
                  </div>
                );
              }

              return (
                <div key={id} className="flex flex-col items-center gap-2 group">
                  <button
                    type="button"
                    onClick={() => {
                      handleSelectTheme(id);
                      setBgPickerOpen(false);
                    }}
                    className={`
                      relative w-full aspect-[3/4] rounded-[22px] overflow-hidden border transition-all duration-300
                      flex flex-col justify-between p-3 select-none text-left
                      ${
                        isActive
                          ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-[1.03] border-white/80"
                          : "border-white/15 hover:border-white/30 hover:-translate-y-0.5"
                      }
                    `}
                    style={{
                      backgroundColor: theme.pageBg,
                    }}
                  >
                    {theme.cardBgImage && (
                      <Image
                        src={theme.cardBgImage}
                        alt={theme.label}
                        fill
                        className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                    {isActive && (
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-20">
                        <div className="size-7 rounded-full bg-white text-black flex items-center justify-center shadow-lg">
                          <Check className="size-4 stroke-[3]" />
                        </div>
                      </div>
                    )}
                  </button>
                  <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors truncate max-w-full">
                    {theme.label}
                  </span>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
