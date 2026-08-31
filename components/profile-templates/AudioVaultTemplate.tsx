"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Plus,
  Flame,
  Heart,
  Share2,
  Smile,
  ExternalLink,
  Music,
  Check,
  Globe,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaRegArrowAltCircleUp,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { ProfileTemplateProps } from "./types";
import ConnectModal from "@/components/ConnectModal";
import ShareButton from "@/components/ShareButton";
import Story from "@/app/admin/components/Story";
import Showcase from "@/app/admin/components/Showcase";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LiquidGlassShareButton } from "../share";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  tiktok: <FaTiktok />,
  x: <SiX />,
  twitter: <SiX />,
};

export default function AudioVaultTemplate({
  user,
  cardTheme,
  cardBackgroundImage,
}: ProfileTemplateProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const scrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const artistOrBio = user.favArtist || user.bio || "Creative Expression";
  const songTitle = user.favSong || user.favPlaylist || "Now Streaming";

  const handleReaction = (emoji: string) => {
    setSelectedEmoji(emoji);
    toast.success(`Reacted with ${emoji}!`);
  };

  const handleShare = async () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/${user.username}`
        : `/${user.username}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Here's my whoiz",
          text: `WHOIZ ${user.username}`,
          url,
        });
        return;
      } catch (e) {
        console.log("Share cancelled");
      }
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-md mx-auto relative px-2 py-4">
      {/* Background Ambient Glow & Dot Grid */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-[140px] opacity-35"
        
        />
        <div
          className="absolute inset-0 opacity-[0.15]"
       
        />
      </div>

      {/* Top Bar Status Banner & Mini Collaborators */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <div className="flex items-center justify-between w-full px-2">
          

          <div className="flex items-center gap-2">
            <ConnectModal links={user.socialConnects} />
            
          </div>
        </div>

        {/* mini  Showcase */}
        <div className="mt-10">
            <Button
              className="bg-green-500 rounded-full"
              onClick={scrollToShowcase}
            >
          <FaRegArrowAltCircleUp />
          see my showcase
        </Button>
             <div
               className="flex items-center justify-center -space-x-3 mt-1 cursor-pointer"
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
       
        </div>
       
      </div>

      {/* Main Arch Avatar Frame */}
    <div className="relative flex flex-col items-center justify-center my-6">
  {/* Organic cloud silhouette backdrop behind arch */}
  <div className="absolute w-56 h-64 bg-white/[0.04] rounded-full blur-2xl pointer-events-none" />

  {/* Arch container */}
  <div className="relative w-52 h-64 rounded-t-[100px] rounded-b-[40px] p-1.5 border-2 border-white/20 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl shadow-2xl overflow-hidden group">
    <img
      src={user.avatarUrl ?? "/profile.jpg"}
      alt={user.name}
      className="w-full h-full object-cover rounded-t-[94px] rounded-b-[34px] transition-transform duration-500 group-hover:scale-105"
    />

    {/* Shiny TOP Badge */}
    {/* Define once, anywhere in the page */}
  </div>

  {/* Share button - outside arch, sitting on the bottom-right border */}
 <LiquidGlassShareButton handleShare={handleShare} imageSrc={user.avatarUrl}/>
</div>

      {/* Hero Headline & Social Proof */}
      <div className="text-center space-y-2 mb-6">
        <h1 className="text-3xl font-black tracking-tight text-white">
          {user.name}
        </h1>
        <p className="text-sm font-medium text-white/70">
          is the <span className="font-bold text-white">spotlight</span> of{" "}
          <span
            className="font-bold underline decoration-2 underline-offset-4"
          
          >
            {artistOrBio}
          </span>
        </p>
        

       
      </div>

      
              <div className="w-full flex flex-col items-center">
                   {/* Custom Link Pills — styled like the Spotify streaming pill, directly below it */}
      {user.links && user.links.length > 0 && (
           <div className="flex w-full max-w-[230px]  flex-col gap-2.5">
  {user.links.map((link) => (
    <a
      key={link.id}
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="
        group relative flex w-full min-h-12
        items-center justify-between
        overflow-hidden rounded-full
        border px-4 py-3
        text-xs font-medium text-white
        bg-white/[0.07]
        backdrop-blur-xl
        shadow-[0_4px_20px_rgba(0,0,0,0.12)]
        transition-all duration-300
        hover:-translate-y-0.5
        hover:bg-white/[0.12]
        hover:border-white/30
        hover:shadow-[0_8px_25px_rgba(0,0,0,0.2)]
      "
   
    >
      {/* Glass reflection */}
      <span
        className="
          pointer-events-none absolute inset-x-4 top-0
          h-px bg-gradient-to-r
          from-transparent via-white/40 to-transparent
        "
      />

      {/* Liquid glow */}
      <span
        className="
          pointer-events-none absolute
          -right-5 -top-5
          h-14 w-14
          rounded-full
          bg-white/10
          blur-xl
          opacity-0
          transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* Label */}
      <span className="relative z-10 min-w-0 flex-1 truncate pr-3 text-white">
        {link.label}
      </span>

      {/* Icon */}
      <span
        className="
          relative z-10 flex shrink-0
          items-center justify-center
          text-white/80
          transition-all duration-300
          group-hover:scale-110
          group-hover:text-white
        "
      >
        {SOCIAL_ICONS[link.platform ?? "website"] ?? <Globe className="size-4" />}
      </span>
    </a>
  ))}
</div>
      )}
              </div>
     

    

      {/* Story & Showcase */}
      {user.story && (
        <div className="my-8">
          <Story story={user.story} txtcolor="#fff" template="classic" />
        </div>
      )}

      <div ref={showcaseRef}>
        <Showcase products={user.showcases} username={user.username} />
      </div>

      {/* Footer */}
      <footer className="flex flex-row gap-2 justify-center items-center mt-12 font-light text-[11px] text-white/40">
        <span>@2026</span>
        <Link href="/">
          <Image
            src="/logos/logo3.svg"
            alt="WHOIZ"
            width={500}
            height={80}
            priority
            className="h-7 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </Link>
      </footer>
    </div>
  );
}
