export type CardThemeId = "default" | "night" | "sunset" | "pastel" | "carrot" | "oceanGreen"
| "dreamSplash" | "oceanRed" | "custom";

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
    accent: "#fffff",
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
    pageBg: "#f9fafb",
    text: "#000000",
    accent: "#E54A2F",

  },
  oceanGreen: {
  label: "Ocean Green",
  cardBgImage: "/themes/oceangreen.webp",
  pageBg: "#042F2E",   // deep teal background to match the image
  text: "#E0F2F1",     // soft mint text for contrast
  accent: "#10B981",   // bright green accent for buttons/borders
},
dreamSplash: {
  label: "Dream Splash",
  cardBgImage: "/themes/3.webp",
  pageBg: "#F9FAFB",   // soft neutral to let colors pop
  text: "#111827",     // dark gray for readability
  accent: "#2563EB",   // rich blue accent (pulls from the splashes)
},
oceanRed: {
  label: "Ocean Red",
  cardBgImage: "/themes/1.webp",
  pageBg: "#FFF5F5",    // gentle light pink background
  text: "#000000",      // deep neutral for solid readability
  accent: "#D32F2F",    // rich crimson red for accents/borders
},
  custom: {
    label: "Custom",
    cardBgImage: "/themes/custom.jpg",
    pageBg: "#020617",
    text: "#e5e7eb",
    accent: "#fffff",
  }

};
