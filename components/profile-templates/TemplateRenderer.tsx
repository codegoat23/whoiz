"use client";

import React from "react";
import { ProfileTemplateProps } from "./types";
import ClassicTemplate from "./ClassicTemplate";
import AudioVaultTemplate from "./AudioVaultTemplate";
import CyberWidgetTemplate from "./CyberWidgetTemplate";
import EditorialBentoTemplate from "./EditorialBentoTemplate";
import PastelScrapbookTemplate from "./PastelScrapbookTemplate";
import StickerPopTemplate from "./StickerPopTemplate";

export default function TemplateRenderer({
  user,
  cardTheme,
  cardBackgroundImage,
  onEditBackground,
}: ProfileTemplateProps) {
  const templateId = user.profileTemplate || "classic";

  switch (templateId) {
    case "airbuds":
      return (
        <AudioVaultTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );

    case "cyber-widget":
      return (
        <CyberWidgetTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );

    case "editorial-bento":
      return (
        <EditorialBentoTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );

    case "pastel-scrapbook":
      return (
        <PastelScrapbookTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );

    case "sticker-pop":
      return (
        <StickerPopTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );

    case "classic":
    default:
      return (
        <ClassicTemplate
          user={user}
          cardTheme={cardTheme}
          cardBackgroundImage={cardBackgroundImage}
          onEditBackground={onEditBackground}
        />
      );
  }
}
