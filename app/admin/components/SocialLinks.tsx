import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  twitter: <Twitter className="w-4 h-4 text-blue-500" />,
  instagram: <Instagram className="w-4 h-4 text-pink-500" />,
  facebook: <Facebook className="w-4 h-4 text-blue-600" />,
  youtube: <Youtube className="w-4 h-4 text-red-500" />,
  linkedin: <Linkedin className="w-4 h-4 text-sky-600" />,
  website: <Globe className="w-4 h-4 text-gray-700" />,
};

interface SocialLinksProps {
  links: { id: string; label: string; url: string; platform: string | null }[];
  bordercolor: string;
  
}

export default function SocialLinks({ links, bordercolor, }: SocialLinksProps) {
  if (!links || links.length === 0) {
    return <p className="text-xs text-gray-500 text-center">No links yet.</p>;
  }

  return (
    <div className="flex flex-col gap-2 w-[200px] h-20">
      {links.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium text-gray-800 hover:bg-gray-50"
          style={{
            borderColor: bordercolor,
          }}
        >
          <span className="text-white">{link.label}</span>
          {iconMap[link.platform ?? "website"]}
        </a>
      ))}
    </div>
  );
}
