"use client";

import { useState, useRef, useCallback } from "react";
import { Check, Loader2, ChevronDown } from "lucide-react";
import {
  PROFILE_TEMPLATES,
  ProfileTemplateId,
} from "@/lib/profileTemplates";
import { updateProfileTemplate } from "./actions";
import { toast } from "sonner";

interface TemplateSelectorProps {
  initialTemplate?: ProfileTemplateId;
  onTemplateChange?: (templateId: ProfileTemplateId) => void;
}

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function TemplateSelector({
  initialTemplate = "classic",
  onTemplateChange,
}: TemplateSelectorProps) {
  const [selected, setSelected] =
    useState<ProfileTemplateId>(initialTemplate);

  const [saveStatus, setSaveStatus] =
    useState<SaveStatus>("idle");

  const [open, setOpen] = useState(true);

  const saveRequestCounter = useRef(0);
  const hideSavedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const templates = Object.values(PROFILE_TEMPLATES);

  const activeTemplate =
    templates.find((tpl) => tpl.id === selected) ?? templates[0];

  const persistTemplate = useCallback(
    (templateId: ProfileTemplateId) => {
      const requestId = ++saveRequestCounter.current;

      setSaveStatus("saving");

      if (hideSavedTimer.current) {
        clearTimeout(hideSavedTimer.current);
        hideSavedTimer.current = null;
      }

      updateProfileTemplate(templateId)
        .then(() => {
          if (requestId !== saveRequestCounter.current) return;

          setSaveStatus("saved");

          hideSavedTimer.current = setTimeout(() => {
            setSaveStatus("idle");
          }, 2500);
        })
        .catch(() => {
          if (requestId !== saveRequestCounter.current) return;

          setSaveStatus("error");
          toast.error("Failed to save template selection");
        });
    },
    []
  );

  const handleSelect = (id: ProfileTemplateId) => {
    if (id === selected) return;

    setSelected(id);
    persistTemplate(id);
    onTemplateChange?.(id);
  };

  return (
    <div className="relative">
      {/* MENU HEADER */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full
          flex items-center justify-between
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          px-4 py-3.5
          transition-all duration-200
          hover:bg-white/[0.07]
          hover:border-white/20
        "
      >
        <div className="flex items-center gap-3">
          <div
            className={`
              size-9
              rounded-xl
              bg-gradient-to-br
              ${activeTemplate.accentGradient}
              border border-white/20
              shadow-lg
              flex items-center justify-center
            `}
          >
            <span className="text-[10px] font-black text-white">
              W
            </span>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                Template
              </span>

              <span className="text-xs text-white/30">
                •
              </span>

              <span className="text-xs text-orange-400 font-medium">
                {activeTemplate.name}
              </span>
            </div>

            <p className="text-[11px] text-white/40 mt-0.5">
              Choose how your profile looks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* SAVE STATUS */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px]">
            {saveStatus === "saving" && (
              <>
                <Loader2 className="size-3 animate-spin text-white/40" />
                <span className="text-white/40">
                  Saving
                </span>
              </>
            )}

            {saveStatus === "saved" && (
              <span className="text-emerald-400/80 font-medium">
                Saved
              </span>
            )}

            {saveStatus === "error" && (
              <span className="text-red-400/80">
                Couldn't save
              </span>
            )}
          </div>

          <ChevronDown
            className={`
              size-4
              text-white/40
              transition-transform duration-200
              ${open ? "rotate-180" : ""}
            `}
          />
        </div>
      </button>

      {/* TEMPLATE MENU */}
      {open && (
        <div className="mt-3">
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.025]
              backdrop-blur-xl
              overflow-hidden
            "
          >
            {/* MENU TITLE */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Choose a template
                  </h3>

                  <p className="text-[11px] text-white/35 mt-1">
                    Your changes are saved automatically.
                  </p>
                </div>

                <span className="text-[10px] text-white/30">
                  {templates.length} templates
                </span>
              </div>
            </div>

            {/* TEMPLATE LIST */}
            <div className="px-3 pb-3 space-y-1">
              {templates.map((tpl) => {
                const isActive = selected === tpl.id;

                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleSelect(tpl.id)}
                    className={`
                      group
                      w-full
                      flex items-center gap-3
                      rounded-xl
                      p-2
                      text-left
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-orange-500/10 border border-orange-500/20"
                          : "border border-transparent hover:bg-white/[0.05] hover:border-white/10"
                      }
                    `}
                  >
                    {/* MINI PREVIEW */}
                    <div
                      className={`
                        relative
                        shrink-0
                        w-16 h-11
                        rounded-lg
                        overflow-hidden
                        border
                        ${
                          isActive
                            ? "border-orange-500/40"
                            : "border-white/10"
                        }
                        bg-gradient-to-br
                        ${tpl.accentGradient}
                      `}
                    >
                      {/* Fake profile preview */}
                      <div className="absolute inset-0 p-2">
                        <div className="flex flex-col items-center justify-center h-full gap-1">
                          <div className="size-2.5 rounded-full bg-white/80" />

                          <div className="w-8 h-1 rounded-full bg-white/60" />

                          <div className="w-10 h-1 rounded-full bg-white/30" />
                        </div>
                      </div>

                      {/* ACTIVE */}
                      {isActive && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="size-5 rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
                            <Check className="size-3 text-white stroke-[3]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`
                            text-sm font-semibold truncate
                            ${
                              isActive
                                ? "text-orange-400"
                                : "text-white"
                            }
                          `}
                        >
                          {tpl.name}
                        </span>

                       
                      </div>

                      
                    </div>

                    {/* CHECK */}
                    <div className="shrink-0 pr-1">
                      {isActive ? (
                        <div className="size-6 rounded-full bg-orange-500/15 flex items-center justify-center">
                          <Check className="size-3.5 text-orange-400 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="size-6 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}