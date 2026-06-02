"use client";

import { useState, useTransition } from "react";
import { updateBio } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const presetRoles = [
  "Web Developer",
  "App Developer",
  "Digital Marketer",
  "Content Creator",
  "Designer",
  "Artist",
  "UI/UX Designer",
  "Data Analyst",
  "Product Manager",
  "Student",
  "Musician",
  "Blogger",
  "Fashionist",
];

export function BioForm() {
  const [bio, setBio] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [useCustom, setUseCustom] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handlePresetClick(role: string) {
    setSelectedPreset(role);
    setUseCustom(false);
    setBio(role);
  }

  function handleOtherClick() {
    setSelectedPreset(null);
    setUseCustom(true);
    if (!bio || presetRoles.includes(bio)) {
      setBio("");
    }
  }

  function handleAction(formData: FormData) {
    startTransition(async () => {
      setError(null);
      try {
        formData.set("bio", bio.trim());
        await updateBio(formData);
      } catch (err: any) {
        const message = err?.message || "Failed to save bio";
        setError(message);
        toast.error(message);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

      {/* 🌅 ORANGE BACKDROP */}
      <div className="absolute inset-0">
        <div className="absolute top-[-160px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-orange-500/25 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-140px] right-[-120px] w-[520px] h-[520px] bg-amber-400/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative w-full max-w-2xl space-y-6">

        {/* 🧭 STEP INDICATOR */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">

            <div className="h-8 w-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              1
            </div>

            <div className="h-[2px] w-10 bg-orange-500/60" />

            <div className="h-8 w-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              2
            </div>

            <div className="h-[2px] w-10 bg-orange-500/60" />

            <div className="h-8 w-8 rounded-full bg-orange-500 text-black flex items-center justify-center text-sm font-semibold shadow-lg shadow-orange-500/30">
              3
            </div>
          </div>
        </div>

        {/* 📦 CARD */}
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_25px_120px_-40px_rgba(255,120,0,0.35)] p-6 sm:p-8">

          {/* TITLE */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold text-white">
              Tell us what you do
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Pick a role or define your own identity
            </p>
          </div>

          <form action={handleAction} className="space-y-6">

            {/* ROLE CHIPS */}
            <div className="space-y-3">
              <p className="text-sm text-white/70 font-medium">
                Pick a role that fits you
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                {presetRoles.map((role) => {
                  const isActive = !useCustom && selectedPreset === role;

                  return (
                    <Button
                      key={role}
                      type="button"
                      onClick={() => handlePresetClick(role)}
                      disabled={isPending}
                      className={`
                        h-auto py-2.5 px-3 text-sm justify-start text-left
                        rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30"
                            : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                        }
                      `}
                    >
                      {role}
                    </Button>
                  );
                })}
              </div>

              {/* OTHER */}
              <Button
                type="button"
                onClick={handleOtherClick}
                disabled={isPending}
                className={`
                  w-full rounded-xl py-2.5 text-sm mt-2 transition
                  ${
                    useCustom
                      ? "bg-orange-500 text-black shadow-lg shadow-orange-500/30"
                      : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
                  }
                `}
              >
                Other – write my own bio
              </Button>
            </div>

            {/* TEXTAREA */}
            <div className="space-y-2">
              <label className="text-sm text-white/70 font-medium">
                {useCustom ? "Your bio" : "Selected description"}
              </label>

              <Textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={isPending || (!useCustom && !!selectedPreset)}
                placeholder={
                  useCustom
                    ? "Describe yourself..."
                    : "Choose a role above or click Other to write your own."
                }
                className="
                  bg-white/5 border-white/10 text-white placeholder:text-white/30
                  focus:border-orange-400 focus:ring-orange-400/20
                  rounded-xl resize-none
                "
              />

              <p className="text-xs text-white/40">
                Short and meaningful bios work best for profiles.
              </p>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}
            </div>

            {/* SUBMIT */}
            <Button
              type="submit"
              disabled={isPending || bio.trim().length < 3}
              className="
                w-full rounded-xl font-semibold
                bg-gradient-to-r from-orange-500 to-amber-400
                text-black hover:from-orange-400 hover:to-amber-300
                shadow-lg shadow-orange-500/30
                transition-all duration-300
              "
            >
              {isPending ? "Saving..." : "Finish & continue"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}