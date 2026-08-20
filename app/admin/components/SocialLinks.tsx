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
    <div className="flex flex-col gap-2 w-[200px] h-20">
      {links.map((link) => (
  <a
    key={link.id}
    href={link.url}
    target="_blank"
    rel="noreferrer"
    className="
      group
      relative
      w-full
      flex
      items-center
      justify-between
      overflow-hidden
      rounded-3xl
      border
      px-3
      py-3
      text-xs
      font-medium
      text-white
      bg-white/[0.08]
      backdrop-blur-xl
      shadow-[0_4px_20px_rgba(0,0,0,0.12)]
      transition-all
      duration-300
      hover:bg-white/[0.14]
      hover:border-white/30
      hover:shadow-[0_6px_25px_rgba(0,0,0,0.2)]
    "
    style={{ borderColor: bordercolor }}
  >
    {/* Glass reflection */}
    <span
      className="
        pointer-events-none
        absolute
        inset-x-3
        top-0
        h-px
        bg-gradient-to-r
        from-transparent
        via-white/40
        to-transparent
      "
    />

    {/* Subtle liquid glow */}
    <span
      className="
        pointer-events-none
        absolute
        -right-6
        -top-6
        h-12
        w-12
        rounded-full
        bg-white/10
        blur-xl
        opacity-0
        transition-opacity
        duration-300
        group-hover:opacity-100
      "
    />

    <span className="relative z-10 truncate text-white">
      {link.label}
    </span>

    <span className="relative z-10 text-white/80 transition-transform duration-300 group-hover:scale-110">
      {iconMap[link.platform ?? "website"]}
    </span>
  </a>
))}
    </div>
  );
}