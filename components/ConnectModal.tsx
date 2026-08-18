"use client";

import { useState } from "react";
import { Globe, X } from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";

import { SiX } from "react-icons/si";

const ICONS: Record<string, any> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  x: SiX,
};

type Link = {
  id: string;
  platform: string;
  url: string;
};

export default function ConnectModal({ links }: { links: Link[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 🌐 TRIGGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 rounded-full bg-black/60 text-white flex flex-row gap-2 items-center text-[11px] backdrop-blur-md hover:scale-105 transition"
      >
        <Globe size={14}/> <span>let’s connect</span>
      </button>

      {/* 🌌 MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* BACKDROP */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* PANEL */}
          <div className="relative w-[min(340px,90vw)] rounded-2xl bg-white/10 border border-white/20 p-6 backdrop-blur-xl">

            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-white text-sm text-center mb-5">
              Connect with me
            </h2>

            {/* ICON GRID */}
            <div className="grid grid-cols-3 gap-5">
              {links.map((link) => {
                const Icon = ICONS[link.platform];

                if (!Icon) return null;

                return (
                  <button
                    key={link.id}
                    onClick={() => window.open(link.url, "_blank")}
                    className="flex flex-col items-center gap-1 text-white hover:scale-110 transition"
                  >
                    <Icon size={26} />
                    <span className="text-[10px] opacity-70">
                      {link.platform}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}