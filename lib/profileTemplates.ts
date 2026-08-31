export type ProfileTemplateId =
  | "classic"
  | "airbuds"
  | "cyber-widget"
  | "editorial-bento"
  | "pastel-scrapbook"
  | "sticker-pop";

export interface ProfileTemplateConfig {
  id: ProfileTemplateId;
  name: string;
  badge?: string;
  tagline: string;
  description: string;
  accentGradient: string;
  previewBg: string;
  features: string[];
}

export const PROFILE_TEMPLATES: Record<ProfileTemplateId, ProfileTemplateConfig> = {
  classic: {
    id: "classic",
    name: "Classic Minimal",
    badge: "Classic",
    tagline: "The original WHOIZ experience",
    description: "Clean card header with frosted glass user bar, link stack, story & showcase carousel.",
    accentGradient: "from-orange-500 to-amber-500",
    previewBg: "#0f172a",
    features: ["Frosted glass card", "Social links stack", "3D Showcase Stage", "Story block"],
  },
  airbuds: {
    id: "airbuds",
    name: "Audio Vault",
    badge: "Ref 01",
    tagline: "Airbuds & audio streamer aesthetic",
    description: "Arch avatar cutout, listener spotlight badge, live Spotify pill & interactive emoji reaction dock.",
    accentGradient: "from-emerald-400 to-teal-500",
    previewBg: "#090d16",
    features: ["Arch avatar cutout", "Top listener badge", "Spotify widget pill", "Emoji reaction dock"],
  },
  "cyber-widget": {
    id: "cyber-widget",
    name: "Cyber Widget",
    badge: "Ref 02",
    tagline: "Cobalt gadget & telemetry widgets",
    description: "Electric blue contour lines, dual metric stat cards, feature action rows & glowing bottom pill dock.",
    accentGradient: "from-blue-600 to-indigo-600",
    previewBg: "#1d2df5",
    features: ["Cobalt wave contours", "Dual metric cards", "Action banner", "Floating widget tabs"],
  },
  "editorial-bento": {
    id: "editorial-bento",
    name: "Editorial Bento",
    badge: "Ref 03",
    tagline: "Immersive high-fashion full-bleed",
    description: "Full-bleed portrait photography, rising dark frosted sheet, 3-column stats bar & 2-column visual grid.",
    accentGradient: "from-zinc-400 to-zinc-200",
    previewBg: "#18181b",
    features: ["Full-bleed photo hero", "Rising glass sheet", "3-column stats bar", "Editorial grid"],
  },
  "pastel-scrapbook": {
    id: "pastel-scrapbook",
    name: "Pastel Scrapbook",
    badge: "Ref 04",
    tagline: "Neo-kawaii scrapbook & friend cloud",
    description: "Sky pastel gradient, emerging avatar stage, pill attribute tags, achievement badges & tilted polaroid gallery.",
    accentGradient: "from-sky-400 to-blue-300",
    previewBg: "#e0f2fe",
    features: ["Sky pastel gradient", "Emerging avatar hero", "Friend avatar cloud", "Polaroid photostrip"],
  },
  "sticker-pop": {
    id: "sticker-pop",
    name: "3D Sticker Pop",
    badge: "Ref 05",
    tagline: "Playful 3D orb & holographic scratch cards",
    description: "3D spherical bubble avatar, stitched map banner with floating stickers, foil cards & glossy golden CTA.",
    accentGradient: "from-amber-400 to-yellow-500",
    previewBg: "#f8fafc",
    features: ["3D bubble orb avatar", "Stitched map banner", "Foil scratch card", "Glossy yellow button"],
  },
};

export const DEFAULT_TEMPLATE_ID: ProfileTemplateId = "classic";

export function getProfileTemplate(id?: string | null): ProfileTemplateConfig {
  if (id && id in PROFILE_TEMPLATES) {
    return PROFILE_TEMPLATES[id as ProfileTemplateId];
  }
  return PROFILE_TEMPLATES[DEFAULT_TEMPLATE_ID];
}
