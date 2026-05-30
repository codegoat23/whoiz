// lib/detectPlatform.ts
export function detectPlatform(url: string): string | null {
  const lower = url.toLowerCase();

  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "twitter";
  if (lower.includes("tiktok.com")) return "tiktok";
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "youtube";
  if (lower.includes("facebook.com")) return "facebook";
  if (lower.includes("linkedin.com")) return "linkedin";

  // kama haijulikani, unaweza kureturn "website" au null
  if (lower.startsWith("http")) return "website";

  return null;
}
