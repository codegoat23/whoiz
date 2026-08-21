import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";

import { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  twitter: <Twitter className="w-4 h-4 text-blue-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <Facebook className="w-4 h-4 text-blue-600" />,
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  linkedin: <Linkedin className="w-4 h-4 text-sky-600" />,
  tiktok: <FaTiktok className="w-4 h-4 text-white" />,
  website: <Globe className="w-4 h-4 text-gray-700" />,
};

interface SocialLinksProps {
  links: {
    id: string;
    label: string;
    url: string;
    platform: string | null;
  }[];
  bordercolor: string;
}

export default function SocialLinks({
  links,
  bordercolor,
}: SocialLinksProps) {
  if (!links || links.length === 0) {
    return (
      <p className="text-xs text-gray-500 text-center">No links yet.</p>
    );
  }

  return (
   <div className="flex w-full max-w-[330px] flex-col gap-2.5">
  {links.map((link) => (
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
      style={{ borderColor: bordercolor }}
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
        {iconMap[link.platform ?? "website"]}
      </span>
    </a>
  ))}
</div>
  );
}