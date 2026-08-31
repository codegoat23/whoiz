"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Share2,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  User,
  Compass,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
  ImagePlus,
  Pencil,
} from "lucide-react";
import { FaRegArrowAltCircleUp, FaTiktok } from "react-icons/fa";
import { ProfileTemplateProps } from "./types";
import ConnectModal from "@/components/ConnectModal";
import ShareButton from "@/components/ShareButton";
import Story from "@/app/admin/components/Story";
import Showcase from "@/app/admin/components/Showcase";
import { Button } from "@/components/ui/button";

const linkIconMap: Record<string, ReactNode> = {
  twitter: <Twitter className="w-4 h-4 text-blue-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <Facebook className="w-4 h-4 text-blue-600" />,
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  linkedin: <Linkedin className="w-4 h-4 text-sky-600" />,
  tiktok: <FaTiktok className="w-4 h-4 text-white" />,
  website: <Globe className="w-4 h-4 text-gray-700" />,
};

export default function CyberWidgetTemplate({
  user,
  cardTheme,
  cardBackgroundImage,
  onEditBackground,
}: ProfileTemplateProps) {
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full max-w-md mx-auto relative px-3 py-4 text-white">
      {/* Cobalt Geometric Wave Background & Aura */}
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[40px] bg-gradient-to-b from-[#2236f5] via-[#1a28cb] to-[#0d1475]">
        {/* Concentric Geometric Wave Lines */}
        <svg
          className="absolute -top-10 -right-10 w-96 h-96 opacity-25 pointer-events-none"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="80" r="60" stroke="white" strokeWidth="3" />
          <circle cx="200" cy="80" r="90" stroke="white" strokeWidth="2.5" />
          <circle cx="200" cy="80" r="120" stroke="white" strokeWidth="2" />
          <circle cx="200" cy="80" r="150" stroke="white" strokeWidth="1.5" />
          <circle cx="200" cy="80" r="180" stroke="white" strokeWidth="1" />
        </svg>

        {/* Ambient Neon Accent Glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-80 opacity-40 blur-[100px] pointer-events-none"
          style={{ backgroundColor: cardTheme.accent }}
        />
      </div>

      {/* Top Header Card */}
      <div className="p-4 space-y-4">
        {/* Avatar + Brand Mark */}
        <div className="flex items-center justify-between">
          <div className="relative size-16 rounded-full bg-white p-1 shadow-xl ring-4 ring-white/20">
            <img
              src={user.avatarUrl ?? "/profile.jpg"}
              alt={user.name}
              className="w-full h-full object-cover rounded-full"
            />
            {/* Status Wink Badge */}
            <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-[#1523b0] border-2 border-white flex items-center justify-center text-[10px] text-white">
              ✦
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ConnectModal links={user.socialConnects} />
            <ShareButton username={user.username} iconOnly />
          </div>
        </div>

        {/* Username & Bio */}
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white/95">
            {user.name}
          </h1>
          {user.bio && (
            <p className="text-xs text-white/75 mt-1 font-medium leading-relaxed">
              {user.bio}
            </p>
          )}
        </div>

        {/* 2-Column Meta Stat Bar */}
       
      </div>

      {/* Featured Banner Card (Reference 2: Subscribe to GO Plus Banner) */}
      <div className="mx-2 my-3 p-4 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-xl shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 size-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="flex items-center gap-3.5 relative z-10">
         
          <div className="flex-1 min-w-0">
           
            
            <p className="text-[11px] text-white/70 leading-snug mt-0.5 ">
              {user.story}
            </p>
          </div>
        </div>
      </div>

      {/* My Goals / 2-Column Metric Widgets */}
      <div className="px-2 my-4">
       
       

        <div className="grid grid-cols-2 gap-3">
          {/* Card 1 — empty with chosen card image background + white overlay */}
          <div
            className="relative overflow-hidden rounded-2xl border border-white/20 transition-all hover:bg-white/15"
            style={{
              backgroundImage: `url(${cardBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {onEditBackground && (
              <button
                type="button"
                onClick={onEditBackground}
                title="Edit card background"
                aria-label="Edit card background"
                className="absolute top-2 right-2 z-30 size-8 rounded-full text-black
                           bg-white backdrop-blur-md border border-white/25 shadow-md
                           hover:bg-white/25 hover:text-white active:scale-95 transition-all"
              >
                <Pencil className="size-3.5 w-full" />
              </button>
            )}
          </div>

          {/* Card 2 */}
          <div className="p-3.5 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col justify-between items-center hover:bg-white/15 transition-all ">
           {/* mini  Showcase */}
        <div className="mt-1">
       
          
             <div
               className="flex items-center justify-center -space-x-3  cursor-pointer"
               onClick={scrollToShowcase}
             >
          {user.showcases.slice(0, 3).map((showcase, index) => (
            <div
              key={showcase.id}
              className={`
                overflow-hidden border-2 shadow-lg  rounded-[10]
                ${index === 1
                  ? "relative size-14 z-10  ring-2 ring-emerald-400/40"
                  : `size-11  ${index === 0 ? "rotate-[-6deg]" : "rotate-[6deg]"}`
                }
              `}
            >
              <img
                src={showcase.imageUrl || user.avatarUrl || "/profile.jpg"}
                alt={showcase.name || "Showcase"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
            <Button
              className="bg-white rounded-full text-[11px] mt-2"
              onClick={scrollToShowcase}
            >
          <FaRegArrowAltCircleUp />
          see my showcase
        </Button>
       
        </div>
          </div>
        </div>
      </div>


      {/* Content Section: Links */}
      {user.links && user.links.length > 0 && (
        <div className="px-2 my-5 space-y-2.5">
          <span className="text-[24px] font-bold text-white  tracking-wider block">
           My Links
          </span>
          {user.links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 backdrop-blur-xl transition-all shadow-md group"
            >
              <span className="text-xs font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                {link.label}
              </span>
              <span className="flex shrink-0 items-center justify-center">
                {linkIconMap[link.platform ?? "website"] ?? <Globe className="w-4 h-4 text-white/70" />}
              </span>
            </a>
          ))}
        </div>
      )}

      {/* Story & Showcase */}
    

      <div className="px-2 mb-20">
        <Showcase products={user.showcases} username={user.username} />
      </div>

   

      {/* Footer */}
      <footer className="flex flex-row gap-2 justify-center items-center font-light text-[11px] text-white/50 pb-4">
        <span>@2026</span>
        <Link href="/">
          <Image
            src="/logos/logo3.svg"
            alt="WHOIZ"
            width={500}
            height={80}
            priority
            className="h-6 w-auto object-contain"
          />
        </Link>
      </footer>
    </div>
  );
}
