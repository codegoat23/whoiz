import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import {
  Dribbble,
  Facebook,
  Instagram,
  Linkedin,
  Share2,
  Smile,
  CircleDot,
  Diamond
} from "lucide-react";
import { notFound } from "next/navigation";
import SocialLinks from "../admin/components/SocialLinks";
import Story from "../admin/components/Story";
import { Metadata } from "next";
import { CARD_THEMES } from "@/lib/cardThemes";
import Showcase from "../admin/components/Showcase";
import ConnectModal from "@/components/ConnectModal";
import ShareButton from "@/components/ShareButton";
import Image from "next/image";
import Link from "next/link";
import ProfileViewTracker from "./ProfileViewTracker";

type Props = {
  params: { username: string };
};

// 🔹 SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ username?: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { username },
    select: { name: true, bio: true, deactivated: true },
  });

  if (!user) {
    return { title: "User Not Found" };
  }

  if (user.deactivated) {
    return { title: "Account Deactivated" };
  }

  return {
    title: `${user.name} | ${user.bio ?? ""}`,
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ username?: string }>;
}) {
  const { username } = await params;

  if (!username) notFound();

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      showcases: true,
      links: true,
      socialConnects: true,
    },
  });

  if (!user) notFound();

  prisma.pageView.create({ data: { userId: user.id } }).catch(() => {});

  if (user.deactivated) {
    return (
      <main className="max-w-md mx-auto p-6 min-h-screen flex flex-col items-center justify-center text-center gap-3">
        <h1 className="text-2xl font-bold">This account has been deactivated</h1>
        <p className="text-muted-foreground text-sm text-balance">
          The owner of this profile has temporarily deactivated it.
        </p>
      </main>
    );
  }

  /* ======================================================
     THEME RESOLUTION (THIS IS THE IMPORTANT PART)
     ====================================================== */

  const themeId =
    (user.cardTheme as keyof typeof CARD_THEMES) || "default";

  const cardTheme = CARD_THEMES[themeId] ?? CARD_THEMES.default;

  // ✅ Custom theme background override
  const cardBackgroundImage =
    themeId === "custom" && user.customBgImageUrl
      ? user.customBgImageUrl
      : cardTheme.cardBgImage;

  return (
    <main
      className="max-w-3xl mx-auto p-6 min-h-screen"
       
    >
      <ProfileViewTracker username={user.username ?? ""} />
      {/* ================= PROFILE CARD ================= */}
      <section className="text-center mb-8 flex flex-col items-center gap-3">
        <Card
          className="max-w-[330px]
    sm:max-w-[300px]
    md:max-w-[320px] w-full rounded-[35px] h-80 flex justify-between items-center p-1 border border-1 border-gray-700 bg-cover bg-[center_0px]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(0,0,0,0.35),
                rgba(0,0,0,0.35)
              ),
              url('${cardBackgroundImage}')
            `,
          }}
        >
          {/* CTA */}
       <ConnectModal links={user.socialConnects} />

          {/* USER INFO BAR */}
          <div
  className="
    relative
    w-full
    h-[20%]
    p-2
    flex
    items-center
    justify-between
    overflow-hidden
    rounded-4xl
    border
    border-white/15
    bg-white/[0.08]
    backdrop-blur-2xl
    shadow-[0_8px_30px_rgba(0,0,0,0.25)]
  "
>
  {/* Glass highlight */}
  <div
    className="
      pointer-events-none
      absolute
      inset-x-4
      top-0
      h-px
      bg-gradient-to-r
      from-transparent
      via-white/40
      to-transparent
    "
  />

  {/* Subtle liquid glow */}
  <div
    className="
      pointer-events-none
      absolute
      -top-8
      left-1/3
      h-16
      w-32
      rounded-full
      bg-orange-500/10
      blur-2xl
    "
  />

  {/* Content */}
  <div className="relative z-10 flex items-center gap-2 min-w-0">
    <img
      src={user.avatarUrl ?? "/profile.jpg"}
      className="
        w-12
        h-12
        rounded-full
        object-cover
        shrink-0
        border
        border-white/20
      "
      alt={user.name}
    />

    <div className="flex flex-col text-left min-w-0">
      <span className="text-[11px] font-medium text-white truncate">
        {user.name}
      </span>

      {user.bio && (
        <span className="text-[9px] text-white/60 truncate">
          {user.bio}
        </span>
      )}
    </div>
  </div>

  {/* Share button */}
  <div className="relative z-10">
    <ShareButton username={user.username} />
  </div>
</div>
        </Card>

        {/* SOCIAL ICONS */}
        <div className="flex gap-2">
          {[CircleDot, Diamond, Smile, Dribbble].map(
            (Icon, i) => (
              <Icon
                key={i}
                className="size-5"
                style={{ color: cardTheme.accent }}
              />
            )
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section>
        {user.links.length > 0 && (
          <div className="flex flex-col gap-2 items-center ">
            <SocialLinks
              links={user.links}
              bordercolor={cardTheme.accent}
            />
          </div>
        )}

        {user.story && (
          <div className="flex justify-center mt-12">
            <Story
              story={user.story}
              
              txtcolor={cardTheme.text}
            />
           
          </div>
        )}
<Showcase
  products={user.showcases}
  username={user.username}
/>


   
         <footer className="flex flex-row gap-2 justify-center items-center mt-10 font-light text-[11px]">
              <span>@2026</span>
              <Link href='/'>
                  <Image
                src="/logos/logo3.svg"
                alt="WHOIZ"
                width={500}
                height={80}
                priority
                className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16 xl:h-[30px]"
              />
              </Link>
                 
            </footer>
      </section>
    </main>
  );
}
