export type CardThemeId = "default" | "night" | "sunset" | "pastel" | "carrot";

export const CARD_THEMES: Record<
  CardThemeId,
  {
    label: string;
    cardBgImage: string;
    pageBg: string;
    text: string;
    accent: string;
  }
> = {
  default: {
    label: "Default",
    cardBgImage: "/themes/background.webp",
    pageBg: "#020617",
    text: "#f9fafb",
    accent: "#22c55e",
  },
  night: {
    label: "Night Sky",
    cardBgImage: "/themes/bubblex.webp",
    pageBg: "#020617",
    text: "#e5e7eb",
    accent: "#38bdf8",
  },
  sunset: {
    label: "Sunset Vibes",
    cardBgImage: "/themes/yellow.webp",
    pageBg: "#0b1120",
    text: "#fef9c3",
    accent: "#f97316",
  },
  pastel: {
    label: "Pastel Soft",
    cardBgImage: "/themes/titaniumBlack.webp",
    pageBg: "#f9fafb",
    text: "#111827",
    accent: "#a855f7",
  },
  carrot:{
    label: "Carrot Orange ",
    cardBgImage: "/themes/orange.webp",
    pageBg: "#FACDDA",
    text: "#111827",
    accent: "#a855f7",

  }
};
