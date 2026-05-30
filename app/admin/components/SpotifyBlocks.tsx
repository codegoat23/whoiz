import Image from "next/image";
import { PlayCircle } from "lucide-react";

interface SpotifyBlockProps {
  type?: "track" | "playlist" | "artist";
  title: string;
  url: string;
  image?: string;
  accent?: string;
}

export default function SpotifyBlock({
  type = "playlist",
  title,
  url,
  image,
  accent = "#1DB954", // default Spotify green
}: SpotifyBlockProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="w-full flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-medium transition hover:scale-[1.02]"
      style={{
        borderColor: accent,
        backgroundColor: `${accent}15`, // light transparent accent
      }}
    >
      <div className="flex items-center gap-2">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={36}
            height={36}
            className="rounded-md"
          />
        ) : (
          <div
            className="w-9 h-9 rounded-md flex items-center justify-center"
            style={{ backgroundColor: accent }}
          >
            <PlayCircle className="w-5 h-5 text-white" />
          </div>
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-[13px]">{title}</span>
          <span className="text-[11px] text-gray-500 capitalize">{type}</span>
        </div>
      </div>

      <PlayCircle
        className="w-5 h-5 opacity-80"
        style={{ color: accent }}
      />
    </a>
  );
}
