import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Whoiz",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} antialiased overflow-x-hidden`}
      >
        <AppProvider>
          <Toaster position="top-right"/>
           {children}
            
        </AppProvider>
        
       
      </body>
    </html>
  );
}
