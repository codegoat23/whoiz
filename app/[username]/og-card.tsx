import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { CARD_THEMES, CardThemeId } from "@/lib/cardThemes";
import { PROFILE_TEMPLATES, getProfileTemplate } from "@/lib/profileTemplates";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_ALT = "WHOIZ Profile";

interface OgUser {
  name: string;
  username: string | null;
  bio: string | null;
  avatarUrl: string | null;
  cardTheme: string;
  profileTemplate: string | null;
  links: Array<{ label: string }>;
  showcases: Array<{ name: string }>;
}

export async function getOgUser(username: string): Promise<OgUser | null> {
  return prisma.user.findUnique({
    where: { username },
    select: {
      name: true,
      username: true,
      bio: true,
      avatarUrl: true,
      cardTheme: true,
      profileTemplate: true,
      deactivated: true,
      links: { select: { label: true } },
      showcases: { select: { name: true } },
    },
  });
}

const INITIALS_FALLBACK = "W";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return INITIALS_FALLBACK;
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

interface OgCardOptions {
  card?: "summary_large_image";
}

export async function buildOgCard(
  username: string,
  _opts?: OgCardOptions
): Promise<ImageResponse> {
  const user = await getOgUser(username);

  const themeId = (user?.cardTheme as CardThemeId) || "default";
  const theme = (user && CARD_THEMES[themeId]) || CARD_THEMES.default;
  const pageBg = theme?.pageBg ?? "#020617";
  const accent = theme?.accent ?? "#ffffff";
  const textColor = theme?.text ?? "#e5e7eb";

  const displayName = user?.name?.trim() || "WHOIZ Member";
  const handle = user?.username ? `@${user.username}` : "@whoiz";
  const bio =
    user?.bio?.trim() ||
    (user ? `See ${displayName}'s WHOIZ profile` : "WHOIZ profile");

  const templateId =
    (user?.profileTemplate as Parameters<typeof getProfileTemplate>[0]) ||
    "classic";
  const template = getProfileTemplate(templateId) ?? PROFILE_TEMPLATES.classic;
  const templateTagline = template?.tagline ?? "My WHOIZ";
  const templateBadge = template?.name ?? "WHOIZ";

  const linkCount = user?.links?.length ?? 0;
  const showcaseCount = user?.showcases?.length ?? 0;

  const hasAvatar = !!user?.avatarUrl;
  const avatar = user?.avatarUrl ?? null;

  const linkPills = [
    ...(user?.links ?? []).slice(0, 3).map((l) => l.label.trim() || "Link"),
    ...(showcaseCount > 0 ? [`${showcaseCount} showcase${showcaseCount > 1 ? "s" : ""}`] : []),
  ]
    .slice(0, 3)
    .map((label, i) => (
      <div
        key={`${label}-${i}`}
        style={{
          display: "flex",
          alignItems: "center",
          height: 44,
          padding: "0 18px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.22)",
          color: textColor,
          fontSize: 20,
          fontWeight: 500,
          maxWidth: 300,
        }}
      >
        <div
          style={{
            display: "flex",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
      </div>
    ));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: `linear-gradient(150deg, ${pageBg} 0%, #000000 100%)`,
          color: textColor,
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        <svg
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <radialGradient
              id="glow"
              cx="15%"
              cy="0%"
              r="80%"
            >
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
            <radialGradient
              id="glow2"
              cx="90%"
              cy="100%"
              r="70%"
            >
              <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#glow)" />
          <rect width="100%" height="100%" fill="url(#glow2)" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "0 90px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: 36,
              overflow: "hidden",
              background: avatar ? undefined : accent,
              color: avatar ? undefined : pageBg,
              fontSize: 44,
              fontWeight: 800,
              boxShadow: `0 12px 50px ${accent}55`,
              marginBottom: 28,
            }}
          >
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatar}
                width={120}
                height={120}
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            ) : (
              initialsOf(displayName)
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 900,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 34,
                  padding: "0 16px",
                  borderRadius: 999,
                  background: accent,
                  color: pageBg,
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  textTransform: "uppercase",
                }}
              >
                {templateBadge}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 74,
                fontWeight: 800,
                letterSpacing: -1.5,
                lineHeight: 1.05,
                color: textColor,
                maxWidth: 900,
              }}
            >
              {displayName}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 32,
                fontWeight: 600,
                color: accent,
                marginTop: 8,
                opacity: 0.95,
              }}
            >
              {handle}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 400,
                color: textColor,
                opacity: 0.85,
                marginTop: 18,
                maxWidth: 780,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {bio}
            </div>
          </div>

          {linkCount > 0 || showcaseCount > 0 ? (
            <div
              style={{
                display: "flex",
                gap: 16,
                marginTop: 34,
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: 860,
              }}
            >
              {linkPills}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: textColor,
                opacity: 0.6,
                marginTop: 30,
                fontStyle: "italic",
              }}
            >
              {templateTagline}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            position: "absolute",
            bottom: 26,
            left: 0,
            right: 0,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: textColor,
            opacity: 0.5,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 8,
              height: 8,
              borderRadius: 999,
              background: accent,
              marginRight: 2,
            }}
          />
          WHOIZ · {handle}
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height: OG_SIZE.height }
  );
}
