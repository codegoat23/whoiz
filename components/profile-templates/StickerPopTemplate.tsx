"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  MapPin,
  Music,
  Plus,
  Share2,
  ExternalLink,
  MessageCircle,
  X,
  Compass,
} from "lucide-react";
import { ProfileTemplateProps } from "./types";
import ConnectModal from "@/components/ConnectModal";
import ShareButton from "@/components/ShareButton";
import Story from "@/app/admin/components/Story";
import Showcase from "@/app/admin/components/Showcase";
import { toast } from "sonner";

export default function StickerPopTemplate({
  user,
  cardTheme,
  cardBackgroundImage,
}: ProfileTemplateProps) {
  const [added, setAdded] = useState(false);

  // Split name into first and last for the 3D sticker box
  const nameParts = user.name.split(" ");
  const firstName = nameParts[0] || user.name;
  const lastName = nameParts.slice(1).join(" ") || "WHOIZ";

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "WZ";

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden rounded-[44px] bg-[#f2f4f8] text-slate-900 shadow-2xl border border-slate-200">
      {/* Top Map Ambient Layer (Reference 5) */}
      <div className="relative h-28 w-full overflow-hidden opacity-30 pointer-events-none bg-slate-300">
        <div
          className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1.5px, transparent 1.5px), radial-gradient(#cbd5e1 1.5px, #f1f5f9 1.5px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f2f4f8]" />
      </div>

      {/* Main Container */}
      <div className="relative -mt-22 px-4 pb-8 space-y-6">
        {/* Top Controls */}
        <div className="flex items-center justify-end px-2">
         

          <div className="flex items-center gap-2">
            <ShareButton username={user.username} iconOnly/>
          </div>
        </div>

        {/* 3D Spherical Orb Avatar & Floating Views Badge (Reference 5) */}
        <div className="relative flex flex-col items-center justify-center my-4">
         

          {/* 3D Orb Avatar */}
          <div className="relative size-32 rounded-full p-2 bg-gradient-to-b from-white via-slate-100 to-slate-300 shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center ring-4 ring-white">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-full h-full rounded-full object-cover shadow-inner"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center text-3xl font-black text-white shadow-inner">
                {initials}
              </div>
            )}

            {/* Specular 3D Reflection */}
            <div className="absolute top-2 left-4 size-10 rounded-full bg-white/40 blur-sm pointer-events-none" />
          </div>

          {/* Floating Stacked Name Labels (Reference 5) */}
          <div className="mt-3 flex flex-col items-center">
            <span className="px-3 py-0.5 rounded bg-white shadow-sm font-black text-base text-slate-900 uppercase tracking-tight">
              {firstName}
            </span>
            <span className="px-3 py-0.5 rounded bg-white/80 shadow-sm font-serif italic text-sm text-slate-500 -mt-1">
              {lastName}
            </span>
          </div>

        
        </div>

        {/* Stitched Map / Location Banner with Floating 3D Stickers (Reference 5) */}
        <div className="relative rounded-3xl border-2 border-dashed border-blue-400 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 text-white shadow-xl overflow-hidden min-h-[90px] flex items-center justify-between">
          <div className="relative z-10 space-y-0.5">
            <div className="inline-block px-2.5 py-1 rounded-md bg-white text-black font-black text-xs uppercase shadow-md">
              1 Spotlight
            </div>
            <p className="text-xs font-extrabold text-white/90 drop-shadow-sm pt-1">
              {user.username ? `@${user.username}` : "WHOIZ Identity"}
            </p>
          </div>

          {/* Floating 3D Stickers Popping Out (Reference 5) */}
          <div className="flex items-center gap-1 text-2xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] animate-pulse">
            <span className="hover:scale-125 transition-transform cursor-pointer">☕</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🥐</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">🍿</span>
            <span className="hover:scale-125 transition-transform cursor-pointer">✨</span>
          </div>
        </div>

        {/* 2-Column Holographic & Sticker Cards (Reference 5) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Left Card: Holographic Foil "BEST FRIENDS / CREATIONS" Scratch Card */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-400 to-cyan-300 text-white shadow-lg border border-white/40 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-2.5 border border-white/30 text-center">
              <span className="font-black text-xs uppercase tracking-wider block text-white drop-shadow-sm">
                ⭐ BEST
              </span>
              <span className="font-black text-xs uppercase tracking-wider block text-amber-200 drop-shadow-sm">
                CREATIONS
              </span>
            </div>
            <p className="text-[10px] font-bold text-center mt-2 text-white/90">
              {user.showcases?.length || 0} Showcases
            </p>
          </div>

          {/* Right Card: "NOW PLAYING" with Apple Music & Spotify 3D Badges */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg border border-white/20 flex flex-col justify-between">
            <div className="flex items-center justify-center gap-2 py-1">
              <div className="size-8 rounded-xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center shadow-md text-xs font-bold">
                ♫
              </div>
              <div className="size-8 rounded-xl bg-[#1DB954] flex items-center justify-center shadow-md text-xs font-bold text-black">
                <Music className="size-4 fill-current" />
              </div>
            </div>
            <div className="text-center mt-1">
              <span className="text-[11px] font-black tracking-wider uppercase block text-cyan-200">
                NOW PLAYING
              </span>
              <span className="text-[9px] text-white/60 font-medium">
                {user.favSong || "Featured Audio"}
              </span>
            </div>
          </div>
        </div>

        {/* Links Stack */}
        {user.links && user.links.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400 block px-1">
              Active Links
            </span>
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 shadow-sm hover:shadow-md transition-all group"
              >
                <span>{link.label}</span>
                <ExternalLink className="size-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
              </a>
            ))}
          </div>
        )}

        {/* Story & Showcase */}
        {user.story && (
          <div className="pt-2">
            <Story story={user.story} txtcolor="#1e293b" template="sticker-pop" />
          </div>
        )}

        <Showcase products={user.showcases} username={user.username} />

       
       

       

        {/* Footer */}
        <footer className="flex flex-row gap-2 justify-center items-center pt-4 font-light text-[11px] text-slate-400">
          <span>@2026</span>
          <Link href="/">
            <Image
              src="/logos/logo3.svg"
              alt="WHOIZ"
              width={500}
              height={80}
              priority
              className="h-6 w-auto object-contain opacity-60"
            />
          </Link>
        </footer>
      </div>
    </div>
  );
}
