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
import Image from "next/image";

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
      {/*  TRIGGER BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="px-3.5 py-3 rounded-full bg-black/60 text-white flex flex-row gap-2 items-center text-xs backdrop-blur-md hover:scale-105 transition"
      >
         <Image
            src="/logos/logo2.svg"
            alt="WHOIZ"
            width={20}
            height={20}
            className="w-6.5 h-6.5"
          /> <span>let’s connect</span>
      </button>

      {/* 🌌 MODAL */}
    {open && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">

    {/* BACKDROP */}
    <div
      onClick={() => setOpen(false)}
      className="absolute inset-0 bg-black/70 backdrop-blur-md"
    />

    {/* CONTENT */}
    <div className="relative w-[min(340px,90vw)]">

      {/* CLOSE */}
      <button
        onClick={() => setOpen(false)}
        className="absolute -top-12 right-0 flex h-9 w-9 items-center justify-center rounded-full
                   bg-white/10 text-white/70 backdrop-blur-md
                   transition hover:bg-white/20 hover:text-white"
      >
        <X size={18} />
      </button>

      <h2 className="mb-6 text-center text-sm font-medium text-white/80">
        Connect with me
      </h2>

      {/* ICON GRID */}
      <div className="grid grid-cols-3 gap-4">
        {links.map((link) => {
          const Icon = ICONS[link.platform];

          if (!Icon) return null;

          return (
            <button
              key={link.id}
              onClick={() => window.open(link.url, "_blank")}
              className="
                group flex flex-col items-center justify-center gap-2
                rounded-2xl border border-white/10
                bg-white/5 px-4 py-4
                text-white backdrop-blur-md
                transition-all duration-200
                hover:-translate-y-1
                hover:border-white/20
                hover:bg-white/10
              "
            >
              <Icon
                size={25}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              <span className="text-[10px] text-white/60 transition group-hover:text-white/90">
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