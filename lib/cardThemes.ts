export type CardThemeId =
  | "default"
  | "night"
  | "sunset"
  | "pastel"
  | "carrot"
  | "oceanGreen"
  | "dreamSplash"
  | "oceanRed"
  | "agate"
  | "air"
  | "astrid"
  | "aura"
  | "bliss"
  | "blocks"
  | "bloom"
  | "breeze"
  | "encore"
  | "custom";

export interface ThemeDefinition {
  label: string;
  cardBgImage: string;
  pageBg: string;
  text: string;
  accent: string;
  hasBadge?: boolean;
  category?: "customizable" | "curated";
  cardGradient?: string;
  fontClass?: string;
  pillStyle?: {
    bg: string;
    border?: string;
    text?: string;
  };
}

export const CARD_THEMES: Record<CardThemeId, ThemeDefinition> = {
  custom: {
    label: "Custom",
    cardBgImage: "/themes/custom.jpg",
    pageBg: "#020617",
    text: "#e5e7eb",
    accent: "#ffffff",
    category: "customizable",
  },
  agate: {
    label: "Agate",
    cardBgImage: "/themes/oceangreen.webp",
    pageBg: "#052e16",
    text: "#ecfdf5",
    accent: "#84cc16",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-[#0d5c3a] via-[#10b981] to-[#84cc16]",
    fontClass: "font-serif",
    pillStyle: {
      bg: "#a3e635",
      text: "#000000",
    },
  },
  air: {
    label: "Air",
    cardBgImage: "/themes/titaniumBlack.webp",
    pageBg: "#f8fafc",
    text: "#0f172a",
    accent: "#0284c7",
    category: "customizable",
    cardGradient: "from-slate-100 to-white",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#ffffff",
      border: "1px solid rgba(0,0,0,0.1)",
      text: "#0f172a",
    },
  },
  astrid: {
    label: "Astrid",
    cardBgImage: "/themes/bubblex.webp",
    pageBg: "#09090b",
    text: "#fafafa",
    accent: "#e2e8f0",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-zinc-950 via-zinc-900 to-black",
    fontClass: "font-serif",
    pillStyle: {
      bg: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.2)",
      text: "#ffffff",
    },
  },
  aura: {
    label: "Aura",
    cardBgImage: "/themes/yellow.webp",
    pageBg: "#faf7f2",
    text: "#292524",
    accent: "#d97706",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-[#e6dfd5] to-[#d8cfc4]",
    fontClass: "font-serif",
    pillStyle: {
      bg: "rgba(216,207,196,0.8)",
      text: "#292524",
    },
  },
  bliss: {
    label: "Bliss",
    cardBgImage: "/themes/titaniumBlack.webp",
    pageBg: "#18181b",
    text: "#f4f4f5",
    accent: "#e4e4e7",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-zinc-400 via-zinc-700 to-zinc-900",
    fontClass: "font-serif",
    pillStyle: {
      bg: "rgba(255,255,255,0.25)",
      border: "1px solid rgba(255,255,255,0.3)",
      text: "#ffffff",
    },
  },
  blocks: {
    label: "Blocks",
    cardBgImage: "/themes/3.webp",
    pageBg: "#2e1065",
    text: "#faf5ff",
    accent: "#ec4899",
    category: "customizable",
    cardGradient: "from-[#6366f1] via-[#7c3aed] to-[#9333ea]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#ec4899",
      border: "2px solid #000000",
      text: "#ffffff",
    },
  },
  bloom: {
    label: "Bloom",
    cardBgImage: "/themes/1.webp",
    pageBg: "#4c0519",
    text: "#fff1f2",
    accent: "#f43f5e",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-[#881337] via-[#be123c] to-[#4338ca]",
    fontClass: "font-mono",
    pillStyle: {
      bg: "transparent",
      border: "2px solid rgba(255,255,255,0.8)",
      text: "#ffffff",
    },
  },
  breeze: {
    label: "Breeze",
    cardBgImage: "/themes/custom.jpg",
    pageBg: "#fdf2f8",
    text: "#831843",
    accent: "#ec4899",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-[#fbcfe8] via-[#f472b6] to-[#fda4af]",
    fontClass: "font-serif",
    pillStyle: {
      bg: "rgba(255,255,255,0.4)",
      border: "1px solid rgba(255,255,255,0.6)",
      text: "#831843",
    },
  },
  encore: {
    label: "Encore",
    cardBgImage: "/themes/bubblex.webp",
    pageBg: "#0c0a09",
    text: "#fafaf9",
    accent: "#ea580c",
    hasBadge: true,
    category: "curated",
    cardGradient: "from-[#1c1917] via-[#292524] to-[#0c0a09]",
    fontClass: "font-serif",
    pillStyle: {
      bg: "transparent",
      border: "1.5px solid rgba(255,255,255,0.4)",
      text: "#ffffff",
    },
  },
  default: {
    label: "Default",
    cardBgImage: "/themes/background.webp",
    pageBg: "#020617",
    text: "#f9fafb",
    accent: "#ffffff",
    category: "customizable",
    cardGradient: "from-slate-900 to-slate-800",
    fontClass: "font-sans",
    pillStyle: {
      bg: "rgba(255,255,255,0.1)",
      border: "1px solid rgba(255,255,255,0.15)",
      text: "#ffffff",
    },
  },
  night: {
    label: "Night Sky",
    cardBgImage: "/themes/bubblex.webp",
    pageBg: "#020617",
    text: "#e5e7eb",
    accent: "#38bdf8",
    category: "customizable",
    cardGradient: "from-[#0b1120] via-[#0284c7] to-[#38bdf8]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "rgba(56,189,248,0.2)",
      border: "1px solid #38bdf8",
      text: "#ffffff",
    },
  },
  sunset: {
    label: "Sunset Vibes",
    cardBgImage: "/themes/yellow.webp",
    pageBg: "#0b1120",
    text: "#fef9c3",
    accent: "#f97316",
    category: "customizable",
    cardGradient: "from-[#ea580c] via-[#f59e0b] to-[#fbbf24]",
    fontClass: "font-serif",
    pillStyle: {
      bg: "rgba(249,115,22,0.3)",
      border: "1px solid #f97316",
      text: "#ffffff",
    },
  },
  pastel: {
    label: "Pastel Soft",
    cardBgImage: "/themes/titaniumBlack.webp",
    pageBg: "#f9fafb",
    text: "#111827",
    accent: "#a855f7",
    category: "customizable",
    cardGradient: "from-[#e9d5ff] via-[#d8b4fe] to-[#c084fc]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#a855f7",
      text: "#ffffff",
    },
  },
  carrot: {
    label: "Carrot Orange",
    cardBgImage: "/themes/orange.webp",
    pageBg: "#f9fafb",
    text: "#000000",
    accent: "#E54A2F",
    category: "customizable",
    cardGradient: "from-[#ea580c] to-[#c2410c]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#E54A2F",
      text: "#ffffff",
    },
  },
  oceanGreen: {
    label: "Ocean Green",
    cardBgImage: "/themes/oceangreen.webp",
    pageBg: "#042F2E",
    text: "#E0F2F1",
    accent: "#10B981",
    category: "customizable",
    cardGradient: "from-[#042f2e] via-[#0f766e] to-[#14b8a6]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#10B981",
      text: "#ffffff",
    },
  },
  dreamSplash: {
    label: "Dream Splash",
    cardBgImage: "/themes/3.webp",
    pageBg: "#F9FAFB",
    text: "#111827",
    accent: "#2563EB",
    category: "customizable",
    cardGradient: "from-[#1e40af] via-[#3b82f6] to-[#60a5fa]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#2563EB",
      text: "#ffffff",
    },
  },
  oceanRed: {
    label: "Ocean Red",
    cardBgImage: "/themes/1.webp",
    pageBg: "#FFF5F5",
    text: "#000000",
    accent: "#D32F2F",
    category: "customizable",
    cardGradient: "from-[#991b1b] via-[#dc2626] to-[#ef4444]",
    fontClass: "font-sans",
    pillStyle: {
      bg: "#D32F2F",
      text: "#ffffff",
    },
  },
};
