// components/HeroPreviewCard.tsx
import React from "react";
import { Card } from "@/components/ui/card";
import { CircleDot, Diamond, Smile, Dribbble, Share2 } from "lucide-react";

function HeroPreviewCard() {
  return (
    <div className="relative w-full flex justify-center">
      
      {/* Glow behind card */}
      <div className="absolute w-[280px] h-[280px] bg-[#E83718]/20 blur-[80px] rounded-full" />

      <Card
        className="relative w-[280px] h-[360px] rounded-[34px] border border-white/10 bg-cover bg-center overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url('/themes/titaniumBlack.webp')",
        }}
      >
        {/* Top Connect Button Mock */}
        <div className="absolute top-3 right-3 ">
          <div className="px-3 py-1 text-[10px] rounded-full bg-white/10 text-white backdrop-blur-md border border-white/10">
            Let's Connect
          </div>
        </div>

        {/* Bottom User Bar */}
        <div className="absolute bottom-0 w-full p-3">
          <div className="flex items-center justify-between bg-black/60 backdrop-blur-md rounded-4xl p-2 border border-white/10">
            
            {/* Avatar + Info */}
            <div className="flex items-center gap-2">
              <img
                src="/profile.jpg"
                className="w-9 h-9 rounded-full object-cover"
                alt="preview"
              />
              <div className="flex flex-col">
                <span className="text-[11px] text-white font-medium">
                  Eric Barack
                </span>
                <span className="text-[9px] text-white/70">
                  Software Developer
                </span>
              </div>
            </div>

            {/* Share mock */}
            <div className="text-black text-[10px] bg-white backdrop-blur-md border border-white/10  rounded-full p-2 flex justify-between items-center gap-1">
               <Share2 className="w-3 h-3 inline-block mr-1" />
              Share
            </div>
          </div>

          {/* Icons row */}
          <div className="flex justify-center gap-3 mt-3 text-white/80">
            {[CircleDot, Diamond, Smile, Dribbble].map((Icon, i) => (
              <Icon key={i} className="w-4 h-4" />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HeroPreviewCard;