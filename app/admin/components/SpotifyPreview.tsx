// components/SpotifyPreview.tsx
type SpotifyPreviewProps = {
  url: string;
  accent?: string; // optional, for border color from your theme
};

export default function SpotifyPreview({ url, accent = "#1DB954" }: SpotifyPreviewProps) {
  // example url:
  // https://open.spotify.com/playlist/3y4z7E0C1n8XzL
  const match = url.match(/spotify\.com\/(track|playlist|album|artist)\/([a-zA-Z0-9]+)/);

  if (!match) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-xs underline"
      >
        Open on Spotify
      </a>
    );
  }

  const [, type, id] = match;
  const embedUrl = `https://open.spotify.com/embed/${type}/${id}`;

  return (
    <div
      className="w-full rounded-xl overflow-hidden border"
      style={{ borderColor: accent }}
    >
      <iframe
        src={embedUrl}
        width="100%"
        height="80"
        frameBorder="0"
        allow="encrypted-media; clipboard-write; fullscreen; picture-in-picture"
      />
    </div>
  );
}
