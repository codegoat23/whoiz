import type { ElementType } from "react";
import {
  FaInstagram,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

export interface SocialPlatform {
  key: string;
  label: string;
  icon: ElementType;
  color: string;
  /** `{handle}` is replaced with the normalized handle */
  urlPattern: string;
  /** Optional regex to validate the handle (letters, dots, underscores, hyphens) */
  handlePattern?: RegExp;
}

export const PLATFORMS: SocialPlatform[] = [
  {
    key: "instagram",
    label: "Instagram",
    icon: FaInstagram,
    color: "#E1306C",
    urlPattern: "https://instagram.com/{handle}",
    handlePattern: /^[a-zA-Z0-9._]{1,30}$/,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    color: "#1877F2",
    urlPattern: "https://facebook.com/{handle}",
    handlePattern: /^[a-zA-Z0-9.]{5,}$/,
  },
  {
    key: "x",
    label: "X (Twitter)",
    icon: SiX,
    color: "#fff",
    urlPattern: "https://x.com/{handle}",
    handlePattern: /^[a-zA-Z0-9_]{1,15}$/,
  },
  {
    key: "github",
    label: "GitHub",
    icon: FaGithub,
    color: "#333",
    urlPattern: "https://github.com/{handle}",
    handlePattern: /^[a-zA-Z0-9-]{1,39}$/,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    color: "#0A66C2",
    urlPattern: "https://linkedin.com/in/{handle}",
    handlePattern: /^[a-zA-Z0-9-]{3,100}$/,
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: FaTiktok,
    color: "#fff",
    urlPattern: "https://tiktok.com/@{handle}",
    handlePattern: /^[a-zA-Z0-9._]{1,24}$/,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: FaYoutube,
    color: "#FF0000",
    urlPattern: "https://youtube.com/@{handle}",
    handlePattern: /^[a-zA-Z0-9._-]{1,64}$/,
  },
];

/**
 * Strip leading @ and trim whitespace from a handle input.
 */
export function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@+/, "");
}

/**
 * Build a full social URL from a platform key and raw handle input.
 * Returns null if the platform is unknown.
 */
export function buildSocialUrl(platformKey: string, handle: string): string | null {
  const platform = PLATFORMS.find((p) => p.key === platformKey);
  if (!platform) return null;

  const normalized = normalizeHandle(handle);
  if (!normalized) return null;

  return platform.urlPattern.replace("{handle}", normalized);
}

/**
 * Try to extract a handle from an existing URL for a given platform.
 * Returns null if the URL doesn't match the expected pattern.
 */
export function extractHandleFromUrl(platformKey: string, url: string): string | null {
  const platform = PLATFORMS.find((p) => p.key === platformKey);
  if (!platform) return null;

  // Build a regex from the urlPattern by replacing {handle} with a capture group
  const escaped = platform.urlPattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace("\\{handle\\}", "([^/]+)");

  const match = url.match(new RegExp(`^${escaped}$`));
  return match?.[1] ?? null;
}

/**
 * Validate a handle for a given platform.
 * Returns null if valid, or an error message string.
 */
export function validateHandle(platformKey: string, handle: string): string | null {
  const normalized = normalizeHandle(handle);

  if (!normalized) {
    return "Handle cannot be empty.";
  }

  const platform = PLATFORMS.find((p) => p.key === platformKey);
  if (!platform) return null;

  if (platform.handlePattern && !platform.handlePattern.test(normalized)) {
    return `Invalid ${platform.label} handle.`;
  }

  return null;
}

/**
 * Get a platform definition by key.
 */
export function getPlatform(key: string): SocialPlatform | undefined {
  return PLATFORMS.find((p) => p.key === key);
}
