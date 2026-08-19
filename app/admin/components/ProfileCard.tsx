"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ProfileImageButton from "./ProfileButton";

interface QuickViewProps {
  id: string;
  fullname: string;
  bio?: string | null;
  story?: string | null;
  avatarUrl?: string | null;
}

function ProfileCard({
  fullname,
  bio,
  story,
  id,
  avatarUrl,
}: QuickViewProps) {
  const [fullName, setFullName] = useState(fullname);
  const [bioState, setBioState] = useState(bio ?? "");
  const [storyState, setStoryState] = useState(story ?? "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: fullName,
          bio: bioState,
          story: storyState,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full text-white">
      <Card className="w-full  bg-transparent p-10">
        <CardHeader className="px-0 pb-8">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Profile
          </CardTitle>

          <p className="mt-1 text-sm text-white/50">
            Manage how your profile appears to visitors.
          </p>
        </CardHeader>

        <div className="space-y-8">
          {/* Avatar */}
          <section className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Profile picture</h3>
              <p className="mt-1 text-xs text-white/45">
                This image will be displayed across your WHOIZ profile.
              </p>
            </div>

            <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <ProfileImageButton avatarUrl={avatarUrl} />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">
                  Update your avatar
                </p>

                <p className="mt-1 text-xs leading-5 text-white/45">
                  Recommended size: 288 × 288px. PNG or JPG only.
                </p>
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Basic information */}
          <section className="space-y-5">
            <div>
              <h3 className="text-sm font-medium">Basic information</h3>
              <p className="mt-1 text-xs text-white/45">
                Tell people who you are.
              </p>
            </div>

            <div className="space-y-5">
              {/* Display Name */}
              <div className="space-y-2">
                <label
                  htmlFor="display-name"
                  className="text-sm font-medium text-white/80"
                >
                  Display name
                </label>

                <Input
                  id="display-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-sm text-white placeholder:text-white/30 focus-visible:border-[#ff5e47] focus-visible:ring-[#ff5e47]/20"
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="bio"
                    className="text-sm font-medium text-white/80"
                  >
                    Bio
                  </label>

                  <span className="text-[11px] text-white/35">
                    {bioState.length}/160
                  </span>
                </div>

                <Input
                  id="bio"
                  value={bioState}
                  maxLength={160}
                  onChange={(e) => setBioState(e.target.value)}
                  placeholder="Tell people what you do..."
                  className="h-11 rounded-xl border-white/10 bg-white/[0.03] text-sm text-white placeholder:text-white/30 focus-visible:border-[#ff5e47] focus-visible:ring-[#ff5e47]/20"
                />
              </div>

              {/* Story */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="story"
                    className="text-sm font-medium text-white/80"
                  >
                    Your story
                  </label>

                  <span className="text-[11px] text-white/35">
                    {storyState.length}/1000
                  </span>
                </div>

                <Textarea
                  id="story"
                  value={storyState}
                  maxLength={1000}
                  onChange={(e) => setStoryState(e.target.value)}
                  placeholder="Share your story, experience, journey, or anything you'd like people to know..."
                  className="min-h-[180px] resize-none rounded-xl border-white/10 bg-white/[0.03] px-4 py-3 text-sm leading-6 text-white placeholder:text-white/30 focus-visible:border-[#ff5e47] focus-visible:ring-[#ff5e47]/20"
                />
              </div>
            </div>
          </section>

          <Separator className="bg-white/10" />

          {/* Save */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              Your changes will appear on your public profile.
            </p>

            <Button
              onClick={handleSave}
              disabled={loading}
              className="rounded-xl bg-[#ff5e47] px-5 text-white hover:bg-[#ff5e47]/90"
            >
              {loading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfileCard;