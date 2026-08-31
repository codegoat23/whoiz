"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logos/logo2.svg"
import {
  Rocket,
  ShoppingBag,
  Heart,
  Sparkles,
  Calendar,
  Share2,
  Smile,
  Compass,
  Star,
  Gift,
  Award,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { ProfileTemplateProps } from "./types";
import ConnectModal from "@/components/ConnectModal";
import ShareButton from "@/components/ShareButton";
import Story from "@/app/admin/components/Story";
import Showcase from "@/app/admin/components/Showcase";

const linkIconMap: Record<string, ReactNode> = {
  twitter: <Twitter className="w-4 h-4 text-sky-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <Facebook className="w-4 h-4 text-blue-600" />,
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  linkedin: <Linkedin className="w-4 h-4 text-sky-600" />,
  tiktok: <FaTiktok className="w-4 h-4 text-slate-800" />,
  website: <Globe className="w-4 h-4 text-sky-600" />,
};

export default function PastelScrapbookTemplate({
  user,
  cardTheme,
  cardBackgroundImage,
}: ProfileTemplateProps) {
  const formattedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "June 15, 2024";

  return (
    <div className="w-full max-w-md mx-auto relative overflow-hidden rounded-[40px] bg-gradient-to-b from-[#60a5fa] via-[#93c5fd] to-[#f0f9ff] text-slate-800 shadow-2xl p-2 sm:p-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-base tracking-tight drop-shadow-sm">
            {user.username ? `@${user.username}` : "WHOIZ"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ShareButton username={user.username} iconOnly />
        </div>
      </div>

     

      {/* Hero Avatar Emerging Stage */}
      <div className="relative mt-4 flex justify-center items-end">
        <div className="relative size-44 rounded-full p-2 bg-white/40 backdrop-blur-md shadow-xl z-0 -mb-10">
          <img
            src={user.avatarUrl ?? "/profile.jpg"}
            alt={user.name}
            className="w-full h-full object-cover rounded-full shadow-inner"
          />
        </div>
      </div>

      {/* White Curved Card Sheet (Reference 4) */}
      <div className="relative z-10 pt-12 pb-6 px-5 rounded-[36px] bg-white shadow-2xl space-y-5">
        {/* Name & Bio */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            {user.name}
          </h1>

          {/* Badges / Attributes Row (Reference 4) */}
          <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-semibold pt-1">
            <span className="flex items-center gap-1">
             {user.bio && (<span>{user.bio}</span>)}
              
            </span>
           
            
          </div>

         
        </div>

        {/* Community Cloud & Achievement Badges (Reference 4) */}
      

        {/* Bento Action Buttons (Reference 4) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 text-white shadow-md flex flex-col justify-between cursor-pointer hover:shadow-lg transition-all active:scale-98">
            <Image src={Logo} alt="logo" className="size-9 bg-white rounded-full p-2"/>
            <div>
              <span className="text-xs font-black block">Quick Connect</span>
              
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-slate-100 transition-all">
            <ShoppingBag className="size-5 text-slate-600 mb-2" />
            <div>
              <span className="text-xs font-black block">Showcase Portals</span>
             
            </div>
          </div>
        </div>

        {/* Tilted Polaroid Scrapbook Gallery (Reference 4) */}
        

        {/* Links */}
        {user.links && user.links.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
              Links & Socials
            </span>
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-sky-50/60 hover:bg-sky-100/70 border border-sky-100 text-xs font-bold text-sky-950 transition-all group"
              >
                <span>{link.label}</span>
                <span className="flex shrink-0 items-center justify-center">
                  {linkIconMap[link.platform ?? "website"] ?? <Globe className="w-4 h-4 text-sky-600" />}
                </span>
              </a>
            ))}
          </div>
        )}

      

        {/* Story */}
        {user.story && (
          <div className="pt-2">
            <Story story={user.story} txtcolor="#334155" template="pastel-scrapbook" />
          </div>
        )}
        <div>
          <Showcase products={user.showcases} username={user.username} />
        </div>

        {/* Footer */}
        <footer className="flex flex-row gap-2 justify-center items-center pt-6 font-light text-[11px] text-slate-600 border-t border-slate-100">
          <span>@2026</span>
          <Link href="/">
            <Image
              src="/logos/logo3.svg"
              alt="WHOIZ"
              width={500}
              height={80}
              priority
              className="h-6 w-auto object-contain "
            />
          </Link>
        </footer>
      </div>
    </div>
  );
}
