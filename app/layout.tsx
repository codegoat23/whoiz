import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "@/components/posthog-provider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://whoiz.space/"),

  title: {
    default: "WHOIZ | Your Digital Identity",
    template: "%s | WHOIZ",
  },

  description:
    "Create your personal WHOIZ profile and share your links, social media, portfolio, and digital identity in one beautiful page.",

  keywords: [
    "WHOIZ",
    "Whoiz bio",
    "link in bio",
    "personal profile",
    "digital identity",
    "creator profile",
    "mini portfolio",
    "social links",
	"whoiz space"
  ],

  authors: [{ name: "WHOIZ" }],
  creator: "WHOIZ",
  publisher: "WHOIZ",

  icons: {
    icon: "/logos/logo1.svg",
    shortcut: "/logos/logo1.svg",
    apple: "/logos/logo1.svg",
  },

  openGraph: {
    type: "website",
    siteName: "WHOIZ",
    title: "WHOIZ | Your Digital Identity",
    description:
      "Create your personal WHOIZ profile and share everything about you in one place.",
    url: "https://whoiz.space/",
    images: [
      {
        url: "/screenshot.png",
        width: 1200,
        height: 630,
        alt: "WHOIZ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WHOIZ | Your Digital Identity",
    description:
      "Create your personal WHOIZ profile and share everything about you in one place.",
    images: ["/screenshot.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  verification: {
    google: "dyHYDYnXo367vjH6hWhQRq5lsSQICHG-zCSXhs3fdE0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <PostHogProvider>
            <AppProvider>
              {children}
            </AppProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
