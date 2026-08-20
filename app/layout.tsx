import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whoiz",
  icons: {
    icon: "/logos/logo1.svg",
  },
  description: "",
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
          <AppProvider>
            <Toaster position="top-right" />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
