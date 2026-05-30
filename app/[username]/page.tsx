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
    select: { name: true, bio: true },
  });

  if (!user) {
    return { title: "User Not Found" };
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
      products: true,
      links: true,
      socialConnects: true,
    },
  });

  if (!user) notFound();

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
      {/* ================= PROFILE CARD ================= */}
      <section className="text-center mb-8 flex flex-col items-center gap-3">
        <Card
          className="w-70 rounded-[35px] h-77 flex justify-between items-center p-1 border border-1 border-gray-700 bg-cover bg-[center_0px]"
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
          <div className="w-68 h-[20%] p-2 flex justify-between bg-black/60 rounded-4xl">
            <div className="flex items-center gap-2">
              <img
                src={user.avatarUrl ?? "/profile.jpg"}
                className="w-12 h-12 rounded-full object-cover"
                alt={user.name}
              />
              <div className="flex flex-col text-left">
                <span className="text-[11px] text-white">
                  {user.name}
                </span>
                {user.bio && (
                  <span className="text-[9px] text-white">
                    {user.bio}
                  </span>
                )}
              </div>
            </div>

           <ShareButton username={user.username} />
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
          <div className="flex justify-center mt-4">
            <Story
              story={user.story}
              
              txtcolor={cardTheme.text}
            />
           
          </div>
        )}
<Showcase
  products={user.products}
  username={user.username}
/>


   
         <footer className="flex justify-center mt-10 font-light text-[11px]">
              <span>@2026 whoiz.bio</span>
            </footer>
      </section>
    </main>
  );
}
