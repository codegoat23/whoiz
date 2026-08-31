"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Globe, ImagePlus } from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import { SiX } from "react-icons/si";
import { ProfileTemplateProps } from "./types";
import ShareButton from "@/components/ShareButton";
import Story from "@/app/admin/components/Story";
import Showcase from "@/app/admin/components/Showcase";

const SOCIAL_ICONS: Record<string, any> = {
  instagram: FaInstagram,
  facebook: FaFacebook,
  github: FaGithub,
  linkedin: FaLinkedin,
  tiktok: FaTiktok,
  x: SiX,
  twitter: SiX,
};

export default function EditorialBentoTemplate({
  user,
  cardTheme,
  cardBackgroundImage,
  onEditBackground,
}: ProfileTemplateProps) {
  const heroImage =
    user.avatarUrl ||
    (cardBackgroundImage !== "/themes/background.webp" ? cardBackgroundImage : "/profile.jpg");

  const totalLinks = user.links?.length || 0;
  const totalShowcases = user.showcases?.length || 0;

  return (
    <div className="w-full max-w-md mx-auto relative rounded-[40px] border border-white/10 bg-zinc-950 text-white shadow-2xl">
      {/* Full-Bleed Photo Hero Header (Reference 3) */}
      <div className="relative h-[360px] w-full overflow-hidden rounded-t-[40px]">
        {onEditBackground && (
          <button
            type="button"
            onClick={onEditBackground}
            title="Edit card background"
            aria-label="Edit card background"
            className="absolute top-4 left-4 z-30 size-8 rounded-full text-white/90
                       bg-white/10 backdrop-blur-md border border-white/25 shadow-md
                       hover:bg-white/25 hover:text-white active:scale-95 transition-all"
          >
            <ImagePlus className="size-3.5 w-full" />
          </button>
        )}

        <Image
          src={heroImage}
          alt={user.name}
          fill
          priority
          className="object-cover object-top scale-105"
        />

        {/* Top Controls Overlay */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-end z-20">
  <ShareButton username={user.username} iconOnly />
</div>

        {/* Soft dark gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Rising Frosted Glass Bottom Sheet (Reference 3) */}
      <div className="relative -mt-16 z-10 px-5 pt-6 pb-8 rounded-t-[36px] rounded-b-[40px] bg-zinc-900/90 backdrop-blur-2xl border-t border-white/15 space-y-5">
        {/* Name & Handle */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-white">
            {user.name}
          </h1>
          <div className="flex flex-row items-center justify-center gap-2">
  <p className="text-xs text-white/60 font-medium">
    @{user.username || "whoiz"}
  </p>

  {user.bio && (
    <>
      <span className="text-xs text-white">•</span>
      <span className="text-xs text-white leading-relaxed">
        {user.bio}
      </span>
    </>
  )}
</div>
          
        </div>

        {/* Primary Action Row: Connected Social Icons + WHOIZ Logo */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap">
          {user.socialConnects &&
            user.socialConnects.length > 0 &&
            user.socialConnects
              .filter((s) => s.visible !== false)
              .map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center rounded-full border border-white/15 bg-white/[0.07] text-white/90 hover:bg-white hover:text-zinc-900 transition-colors duration-200 size-10"
                    title={social.platform}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}

          <Link
            href={`/${user.username || ""}`}
            className="flex items-center justify-center rounded-full border border-white/15 bg-white text-zinc-900 hover:bg-white/90 transition-colors duration-200 size-10"
            title={`${user.username} public page`}
          >
            <Image
              src="/logos/logo2.svg"
              alt="WHOIZ"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          </Link>
        </div>

       

       

          {/* Story */}
        {user.story && (
          <div className="pt-2 flex justify-center items-center">
            <Story story={user.story} txtcolor="#f4f4f5" template="editorial-bento" />
          </div>
        )}

        {/* 2-Column Showcase & Visual Media Grid (Reference 3) */}
         {/* Links Stack */}
        {user.links && user.links.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white/60 block">
              Curated Links
            </span>
            {user.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.07] hover:bg-white/[0.13] border border-white/10 transition-all text-xs font-semibold text-white group"
              >
                <span>{link.label}</span>
                <span className="flex shrink-0 items-center justify-center text-white/70">
                  {(() => {
                    const Icon = SOCIAL_ICONS[link.platform ?? "website"];
                    return Icon ? (
                      <Icon className="w-4 h-4" />
                    ) : (
                      <Globe className="w-4 h-4" />
                    );
                  })()}
                </span>
              </a>
            ))}
          </div>
        )}
        {user.showcases && user.showcases.length > 0 && (
          <div className="relative space-y-3 pt-2 mb-10 z-30">
           

             <Showcase products={user.showcases} username={user.username} />
          </div>
        )}

       

      

        {/* Lower Editorial Footnote & WHOIZ Logo */}
        <div className="pt-4 flex flex-col items-center gap-2 border-t border-white/10">
          <div className="size-9 rounded-full overflow-hidden border border-white/20">
            <img
              src={user.avatarUrl ?? "/profile.jpg"}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs font-semibold text-white/90">{user.name}</p>
          <p className="text-[10px] text-white/40">Connect & Explore</p>

          <footer className="flex flex-row gap-2 justify-center items-center mt-3 font-light text-[11px] text-white/40">
            <span>@2026</span>
            <Link href="/">
              <Image
                src="/logos/logo3.svg"
                alt="WHOIZ"
                width={500}
                height={80}
                priority
                className="h-6 w-auto object-contain opacity-70"
              />
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
}
