"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Wifi,
  Signal,
  BatteryFull,
  Share2,
  CircleDot,
  Diamond,
  Smile,
  Dribbble,
  Sparkles,
  Globe,
  Lock,
  Instagram,
  Linkedin,
  Youtube,
  Quote,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { Card, CardContent } from "./ui/card";

// ---------------------------------------------------------------------------
// Profiles Data (Whoiz Creators with Real Themes)
// ---------------------------------------------------------------------------

export interface CreatorProfile {
  id: string;
  username: string;
  name: string;
  bio: string;
  avatar: string;
  themeBg: string;
  accent: string;
  links: {
    id: string;
    label: string;
    platform: string;
    url: string;
  }[];
  story: string;
  showcaseTitle: string;
  showcaseImage?: string;
}

const profiles: CreatorProfile[] = [
  {
    id: "eric",
    username: "ericbarack",
    name: "Eric Barack",
    bio: "Software Developer & Designer",
    avatar: "/profile.jpg",
    themeBg: "/themes/titaniumBlack.webp",
    accent: "#f97316",
    links: [
      { id: "1", label: "GitHub", platform: "github", url: "https://github.com" },
      { id: "2", label: "X / Twitter", platform: "x", url: "https://x.com" },
      { id: "3", label: "Portfolio", platform: "website", url: "#" },
    ],
    story: "Building fluid and aesthetic digital products combining design systems and fullstack engineering.",
    showcaseTitle: "NeoDesign System",
  },
  {
    id: "elena",
    username: "elenak",
    name: "Elena Rostova",
    bio: "3D Motion & Visual Artist",
    avatar: "/avatar/people3.jpg",
    themeBg: "/themes/bubblex.webp",
    accent: "#38bdf8",
    links: [
      { id: "1", label: "Dribbble", platform: "dribbble", url: "https://dribbble.com" },
      { id: "2", label: "Instagram", platform: "instagram", url: "https://instagram.com" },
      { id: "3", label: "ArtStation", platform: "website", url: "#" },
    ],
    story: "Crafting surreal visual worlds, real-time 3D sculptures, and spatial experiences.",
    showcaseTitle: "HyperSpace 3D",
  },
  {
    id: "milo",
    username: "milor",
    name: "Milo Rivera",
    bio: "Creative Technologist & UI Lead",
    avatar: "/avatar/people1.jpg",
    themeBg: "/themes/3.webp",
    accent: "#2563EB",
    links: [
      { id: "1", label: "GitHub", platform: "github", url: "https://github.com" },
      { id: "2", label: "LinkedIn", platform: "linkedin", url: "https://linkedin.com" },
      { id: "3", label: "Design Kit", platform: "website", url: "#" },
    ],
    story: "Exploring generative interfaces, interaction mechanics, and future web tools.",
    showcaseTitle: "Flux UI Kit",
  },
  {
    id: "nora",
    username: "norap",
    name: "Nora Patel",
    bio: "Product Designer & Curator",
    avatar: "/avatar/people2.jpg",
    themeBg: "/themes/orange.webp",
    accent: "#E54A2F",
    links: [
      { id: "1", label: "X / Twitter", platform: "x", url: "https://x.com" },
      { id: "2", label: "Substack", platform: "website", url: "#" },
      { id: "3", label: "Instagram", platform: "instagram", url: "https://instagram.com" },
    ],
    story: "Curating minimal aesthetics, tactile product architectures, and modern typography.",
    showcaseTitle: "Aura Studio",
  },
  {
    id: "jonas",
    username: "jonasw",
    name: "Jonas Wright",
    bio: "Sound Designer & Producer",
    avatar: "/avatar/people4.jpg",
    themeBg: "/themes/oceangreen.webp",
    accent: "#10B981",
    links: [
      { id: "1", label: "YouTube", platform: "youtube", url: "https://youtube.com" },
      { id: "2", label: "Spotify", platform: "website", url: "#" },
      { id: "3", label: "SoundCloud", platform: "website", url: "#" },
    ],
    story: "Designing spatial acoustics, organic soundscapes, and synth architectures.",
    showcaseTitle: "Echo Frequencies",
  },
  {
    id: "amara",
    username: "amarab",
    name: "Amara Blake",
    bio: "Brand Strategist & Art Director",
    avatar: "/avatar/black.jpg",
    themeBg: "/themes/yellow.webp",
    accent: "#f97316",
    links: [
      { id: "1", label: "LinkedIn", platform: "linkedin", url: "https://linkedin.com" },
      { id: "2", label: "Instagram", platform: "instagram", url: "https://instagram.com" },
      { id: "3", label: "ReadCV", platform: "website", url: "#" },
    ],
    story: "Helping innovative brands and visionaries find their authentic aesthetic voice.",
    showcaseTitle: "Solstice Identity",
  },
];

// ---------------------------------------------------------------------------
// Social Icon Resolver
// ---------------------------------------------------------------------------

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "github":
      return <FaGithub className="w-3.5 h-3.5 text-white" />;
    case "x":
      return <SiX className="w-3.5 h-3.5 text-white" />;
    case "dribbble":
      return <Dribbble className="w-3.5 h-3.5 text-pink-400" />;
    case "instagram":
      return <Instagram className="w-3.5 h-3.5 text-pink-500" />;
    case "linkedin":
      return <Linkedin className="w-3.5 h-3.5 text-sky-400" />;
    case "youtube":
      return <Youtube className="w-3.5 h-3.5 text-red-500" />;
    default:
      return <Globe className="w-3.5 h-3.5 text-gray-300" />;
  }
}

// ---------------------------------------------------------------------------
// Reusable Profile Card (Matches [username]/page.tsx design)
// ---------------------------------------------------------------------------

function ProfileCard({
  profile,
  className = "",
  compact = false,
}: {
  profile: CreatorProfile;
  className?: string;
  compact?: boolean;
}) {
  return (
    <>
         <div
      className={`relative flex flex-col justify-between overflow-hidden rounded-[30px] sm:rounded-[35px] border border-white/15 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.85)] select-none ${
        compact ? "p-2.5" : "p-3 sm:p-3.5"
      } ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.35),
            rgba(0,0,0,0.35)
          ),
          url('${profile.themeBg}')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top CTA: Let's Connect */}
      <div className="flex items-center justify-center pt-0.5">
        <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[10px] sm:text-xs font-medium text-white backdrop-blur-md border border-white/10 shadow-sm transition hover:scale-105">
          <Image
            src="/logos/logo2.svg"
            alt="WHOIZ"
            width={16}
            height={16}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
          />
          <span>let’s connect</span>
        </div>
      </div>

      {/* USER INFO BAR - Liquid Glow Glassmorphic bar */}
      <div className="relative w-full overflow-hidden rounded-[20px] sm:rounded-4xl border border-white/15 bg-white/[0.08] p-2 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        {/* Glass highlight top line */}
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        {/* Subtle liquid glow */}
        <div
          className="pointer-events-none absolute -top-8 left-1/3 h-16 w-32 rounded-full blur-2xl opacity-70"
          style={{ backgroundColor: profile.accent }}
        />

        {/* Bar Content */}
        <div className="relative z-10 flex items-center justify-between gap-1.5">
          {/* Avatar + Info */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={profile.avatar}
              alt={profile.name}
              className={`${
                compact ? "w-8 h-8" : "w-9 h-9 sm:w-11 sm:h-11"
              } rounded-full object-cover shrink-0 border border-white/20`}
              draggable={false}
            />

            <div className="flex flex-col text-left min-w-0">
              <span
                className={`${
                  compact ? "text-[10px]" : "text-[11px] sm:text-xs"
                } font-medium text-white truncate`}
              >
                {profile.name}
              </span>
              <span
                className={`${
                  compact ? "text-[8px]" : "text-[9px] sm:text-[10px]"
                } text-white/60 truncate`}
              >
                {profile.bio}
              </span>
            </div>
          </div>

          {/* Share button */}
          <div className="relative z-10 shrink-0">
            <div className="flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[9px] sm:text-[10px] font-semibold text-black shadow-sm transition hover:scale-105">
              <Share2 className="w-3 h-3" />
              <span>Share</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons row matching [username] page */}
      
    </div>
    <div className="flex items-center justify-center gap-2 pt-1.5 mt-5">
        {[CircleDot, Diamond, Smile, Dribbble].map((Icon, i) => (
          <Icon
            key={i}
            className={`${compact ? "w-3.5 h-3.5" : "w-4 h-4"}`}
            style={{ color: profile.accent }}
          />
        ))}
      </div>
    </>
   
  );
}

// ---------------------------------------------------------------------------
// Phone Mockup (Simulates live [username] public page)
// ---------------------------------------------------------------------------

function PhoneMockup({ activeProfile }: { activeProfile: CreatorProfile }) {
  return (
    <div className="relative z-50 h-[580px] w-[290px] shrink-0 sm:h-[630px] sm:w-[320px]">
      
      

      {/* Frame — Outer Bezel */}
      <div className="absolute inset-0 rounded-[46px] border-[6px] border-neutral-800 bg-black shadow-[0_40px_100px_-20px_rgba(0,0,0,0.95)] ring-1 ring-white/10" />

      {/* Screen — Phone Viewport */}
      <div className="absolute inset-[6px] flex flex-col overflow-hidden rounded-[40px] bg-gradient-to-b from-[#0d131f] via-[#080c14] to-[#030508] text-white">
        {/* Status Bar */}
        <div className="relative z-20 flex shrink-0 items-center justify-between px-6 pt-3 text-[12px] font-medium text-white/90">
          <span>9:41</span>
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-2 z-30 -translate-x-1/2">
  <motion.div
    layout
    className="relative flex h-[25px] w-[100px] items-center justify-end rounded-full bg-black px-2 shadow-[0_2px_8px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
    transition={{
      layout: {
        duration: 0.35,
        ease: "easeInOut",
      },
    }}
  >
    {/* Front camera */}
    <div className="absolute left-1/2 top-1/2 h-[8px] w-[8px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#111] ring-1 ring-white/10">
      <div className="absolute inset-[2px] rounded-full bg-black" />
    </div>

    {/* Sensor */}
    <div className="absolute right-[16px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-[#101010] ring-1 ring-white/5" />
  </motion.div>
</div>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryFull className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Browser URL bar simulating public username page */}
        <div className="relative z-20 mt-2 px-4 py-4">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-[10px] text-white/70 backdrop-blur-md">
            <div className="flex items-center gap-1.5 min-w-0">
               <Image
            src="/logos/logo2.svg"
            alt="WHOIZ"
            width={16}
            height={16}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
          />
              <span className="truncate">whoiz.space/{activeProfile.username}</span>
            </div>
            
          </div>
        </div>

        {/* Public Page Viewport Container */}
        <div className="relative flex-1 overflow-y-auto px-3.5 pt-2 pb-6 custom-scrollbar">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeProfile.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="flex flex-col items-center gap-3 w-full"
            >
              {/* Profile Card */}
              <div className="w-full h-[260px] sm:h-[280px]">
                <ProfileCard profile={activeProfile} className="h-full w-full" />
              </div>

             
             

              {/* Story / About Quote Snippet */}
              {activeProfile.story && (
                <Card className="relative flex w-full max-w-[380px] items-center justify-center border-none bg-left p-0 text-center backdrop-blur-2xl mt-10">
      <CardContent className="relative h-full w-full rounded-[12px] bg-black/50 p-8">
        
        {/* Top-left quote */}
        <Quote
          className="absolute -left-2 -top-2 h-10 w-10 opacity-30"
          strokeWidth={1.5}
        />

        {/* Story */}
        <span
          className="relative z-10 block p-4 text-lg font-medium leading-8"
          
        >
          {activeProfile.story}
        </span>

        {/* Bottom-right quote */}
        <Quote
          className="absolute -bottom-2 -right-2 h-10 w-10 rotate-180 opacity-30"
          strokeWidth={1.5}
        />

      </CardContent>
    </Card>
              )}

             

              {/* Footer */}
              <div className="flex items-center justify-center gap-1.5 pt-1 text-[9px] font-light text-white/50">
                <span>@2026</span>
                <Image
                  src="/logos/logo3.svg"
                  alt="WHOIZ"
                  width={60}
                  height={14}
                  className="h-6 w-auto object-contain opacity-70"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Home Indicator Bar */}
        <div className="relative z-20 flex justify-center pb-2 pt-1">
          <div className="h-1 w-28 rounded-full bg-white/40" />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conveyor — Rotating Carousel of Whoiz Profile Cards
// ---------------------------------------------------------------------------

const OFFSETS = [-2, -1, 1, 2];
const CARD_W = 300;
const CARD_H = 330;

const SLOT_STYLE = {
  [-2]: { x: -620, opacity: 0.55, scale: 0.85 },
  [-1]: { x: -320, opacity: 0.5, scale: 0.92 },
  [1]: { x: 320, opacity: 0.5, scale: 0.92 },
  [2]: { x: 620, opacity: 0.55, scale: 0.85 },
};

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function Conveyor({ activeSeq }: { activeSeq: number }) {
  const stageCards = OFFSETS.map((offset) => {
    const seq = activeSeq + offset;
    const profile = profiles[mod(seq, profiles.length)];
    return { seq, offset, profile };
  });

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <AnimatePresence initial={false}>
        {stageCards.map(({ seq, offset, profile }) => {
          const target = SLOT_STYLE[offset as keyof typeof SLOT_STYLE];

          const isEmergingFromPhone = offset === -1;
          const isEnteringFromEdge = offset === 2;

          const initial = isEmergingFromPhone
            ? { x: 0, opacity: 0.2, scale: 0.7 }
            : isEnteringFromEdge
            ? { x: 880, opacity: 0, scale: 0.72 }
            : false;

          const exit =
            offset === -2
              ? { x: -880, opacity: 0, scale: 0.7 }
              : { x: 0, opacity: 0, scale: 0.5 };

          return (
            <motion.div
              key={seq}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `calc(50% - ${CARD_W / 2}px)`,
                top: `calc(50% - ${CARD_H / 2}px)`,
              }}
              initial={initial}
              animate={{
                x: target.x,
                opacity: target.opacity,
                scale: target.scale,
              }}
              exit={exit}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            >
              <ProfileCard profile={profile} compact={false} className="h-full w-full" />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// DatingHero / Main Carousel Section
// ---------------------------------------------------------------------------

const CYCLE_MS = 3400;

export default function DatingHero() {
  const [activeSeq, setActiveSeq] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActiveSeq((s) => s + 1);
      }
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, []);

  const activeProfile = profiles[mod(activeSeq, profiles.length)];

  return (
    <section className="relative w-full overflow-hidden bg-[#050506] py-20 sm:py-28">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px] opacity-25 transition-colors duration-1000"
        style={{ backgroundColor: activeProfile.accent }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 text-center z-20">
       

        <h2 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Live profiles,{" "}
          <span className="bg-white bg-clip-text text-transparent">
            beautifully
          </span>{" "}
          showcased.
        </h2>
       
      </div>

      {/* Interactive Carousel Stage */}
      <div
        className="relative mx-auto h-[580px] max-w-[1400px] overflow-hidden sm:h-[650px] mt-12"
        onMouseEnter={() => (pausedRef.current = true)}
        onMouseLeave={() => (pausedRef.current = false)}
      >
        {/* Orbiting Conveyor Cards */}
        <Conveyor activeSeq={activeSeq} />

        {/* Center Static Phone Mockup */}
        <div className="absolute inset-0 flex items-center justify-center">
          <PhoneMockup activeProfile={activeProfile} />
        </div>
      </div>
    </section>
  );
}