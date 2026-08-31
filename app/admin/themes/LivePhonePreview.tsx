"use client";

import React from "react";
import { ProfileUser } from "@/components/profile-templates/types";
import { CardThemeId, CARD_THEMES } from "@/lib/cardThemes";
import { ProfileTemplateId } from "@/lib/profileTemplates";
import TemplateRenderer from "@/components/profile-templates/TemplateRenderer";

interface LivePhonePreviewProps {
  user: ProfileUser;
  selectedTheme: CardThemeId;
  selectedTemplate: ProfileTemplateId;
  customBgImageUrl?: string | null;
  onEditBackground?: () => void;
}

export default function LivePhonePreview({
  user,
  selectedTheme,
  selectedTemplate,
  customBgImageUrl,
  onEditBackground,
}: LivePhonePreviewProps) {
  const cardTheme = CARD_THEMES[selectedTheme] ?? CARD_THEMES.default;

  const cardBackgroundImage =
    selectedTheme === "custom" && customBgImageUrl
      ? customBgImageUrl
      : cardTheme.cardBgImage;

  // Clone user with live selected template and theme
  const previewUser: ProfileUser = {
    ...user,
    cardTheme: selectedTheme,
    customBgImageUrl: customBgImageUrl,
    profileTemplate: selectedTemplate,
  };

  return (
    <div
      className="w-full rounded-[40px] overflow-hidden select-none"
      style={{ backgroundColor: "" }}
    >
      {/* DYNAMIC TEMPLATE RENDERER (exact template at its natural width) */}
      <div className="relative w-full max-w-md mx-auto">
        <TemplateRenderer
          user={previewUser}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      </div>
    </div>
  );
}
