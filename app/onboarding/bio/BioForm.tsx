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
  "Cybersecurity Enthusiast",
  "Student",
  "Musician",
  "blogger",
  "fashionist",
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
        await updateBio(formData); // server action
      } catch (err: any) {
        const message = err?.message || "Failed to save bio";
        setError(message);
        toast.error(message);
      }
    });
  }

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
        {/* onboarding slider */}
      <div className="flex items-center justify-center gap-3">
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-full bg-[#FF5E57] text-white flex items-center justify-center text-sm font-semibold">
      1
    </div>

    <div className="h-[2px] w-8 bg-[#FF5E57]" />

    <div className="h-8 w-8 rounded-full bg-[#FF5E57] text-white flex items-center justify-center text-sm font-semibold">
      2
    </div>

    <div className="h-[2px] w-8 bg-[#FF5E57]" />

    <div className="h-8 w-8 rounded-full border bg-[#FF5E57] text-white flex items-center justify-center text-sm font-semibold">
      3
    </div>
  </div>
</div>
{/* end of onboarding slider */}
      <div>
        <h1 className="text-2xl font-semibold mb-1">Tell us what you do</h1>
       
      </div>

      <form action={handleAction} className="space-y-6">
        {/* Preset big buttons */}
        <div className="space-y-2">
          <p className="text-sm font-medium">Pick a role that fits you</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {presetRoles.map((role) => {
              const isActive = !useCustom && selectedPreset === role;
              return (
                <Button
                  key={role}
                  type="button"
                  variant={isActive ? "default" : "outline"}
                  className="h-auto py-3 px-3 text-sm text-left justify-start whitespace-normal"
                  onClick={() => handlePresetClick(role)}
                  disabled={isPending}
                >
                  {role}
                </Button>
              );
            })}
          </div>

          {/* "Other" button */}
          <Button
            type="button"
            variant={useCustom ? "default" : "outline"}
            className="w-full h-auto py-3 text-sm mt-3"
            onClick={handleOtherClick}
            disabled={isPending}
          >
            Other – write my own bio
          </Button>
        </div>

        {/* Hidden field so server always gets it */}
        <input type="hidden" name="bio" value={bio} />

        {/* Textarea */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {useCustom ? "Your bio" : "Selected description"}
          </label>
          <Textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isPending || (!useCustom && !!selectedPreset)}
            placeholder={
              useCustom
                ? ""
                : "Pick one of the roles above or click Other to write your own bio."
            }
          />
          <p className="text-xs text-muted-foreground">
            Short and sweet is best – this may appear on your profile.
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || bio.trim().length < 3}
        >
          {isPending ? "Saving..." : "Finish & continue"}
        </Button>
      </form>
    </div>
  );
}
