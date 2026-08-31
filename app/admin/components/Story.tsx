import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import React from "react";

interface StoryProps {
  story: string | null;
  txtcolor: string;
  template?: string;
}

function Story({ story, txtcolor, template = "classic" }: StoryProps) {
  switch (template) {
    /* 🎵 AirBuds — glassy audio card with waveform accent */
    case "airbuds":
      return (
        <div className="relative py-5">
          <div className="mx-auto flex w-full max-w-[380px] items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-2xl shadow-lg">
            <Quote
              className="h-5 w-5 shrink-0 opacity-60"
              strokeWidth={1.5}
              style={{ color: "#1DB954" }}
            />
            <span className="flex-1 text-sm font-medium leading-6" style={{ color: txtcolor }}>
              {story}
            </span>
            {/* Waveform bars */}
            <span className="flex shrink-0 items-end gap-[3px]">
              {[0.4, 1, 0.6, 0.8, 0.5].map((h, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full"
                  style={{
                    height: `${h * 16}px`,
                    backgroundColor: "#1DB954",
                    animation: `storyWave 1s ease-in-out ${i * 0.12}s infinite`,
                  }}
                />
              ))}
            </span>
          </div>
          <style>{`
            @keyframes storyWave {
              0%,100% { transform: scaleY(0.4); }
              50% { transform: scaleY(1); }
            }
          `}</style>
        </div>
      );

    /* 🤖 Cyber-Widget — neon glitch card */
    case "cyber-widget":
      return (
      <div className="relative py-4">
  {/* Ambient glow behind glass */}
  <div
    className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
    style={{
      background: "rgba(34, 211, 238, 0.10)",
    }}
  />

  {/* Liquid glass card */}
  <div
    className="relative mx-auto w-full max-w-[380px] overflow-hidden border px-5 py-5 backdrop-blur-xl"
    style={{
      borderColor: "rgba(255,255,255,0.16)",

      background: `
        linear-gradient(
          135deg,
          rgba(255,255,255,0.12),
          rgba(255,255,255,0.035) 45%,
          rgba(34,211,238,0.045)
        )
      `,

      boxShadow: `
        inset 0 1px 0 rgba(255,255,255,0.22),
        inset 0 -1px 0 rgba(255,255,255,0.05),
        inset 1px 0 0 rgba(255,255,255,0.08),
        0 8px 40px rgba(0,0,0,0.25),
        0 0 30px rgba(34,211,238,0.08)
      `,

     
    }}
  >
    {/* Glass reflection */}
    <div
      className="pointer-events-none absolute inset-0 opacity-30"
      style={{
        background: `
          linear-gradient(
            120deg,
            rgba(255,255,255,0.18) 0%,
            rgba(255,255,255,0.04) 18%,
            transparent 42%
          )
        `,
      }}
    />

    {/* Cyan liquid glow */}
    <div
      className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full blur-3xl"
      style={{
        background: "rgba(34,211,238,0.12)",
      }}
    />

    {/* Story content */}
    <div className="relative z-10">
      <span
        className="mb-2 block font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{
          color: "#22d3ee",
          textShadow: "0 0 12px rgba(34,211,238,0.5)",
        }}
      >
        // story
      </span>

      <span
        className="block  text-sm leading-7"
        style={{
          color: txtcolor,
        }}
      >
        {story}
      </span>
    </div>

    {/* Tiny glass corner highlight */}
    <div
      className="pointer-events-none absolute right-0 top-0 h-10 w-10"
      style={{
        borderTop: "1px solid rgba(255,255,255,0.35)",
        borderRight: "1px solid rgba(255,255,255,0.18)",
      }}
    />
  </div>
</div>
      );

    /* 📰 Editorial-Bento — minimal typographic pull-quote */
    case "editorial-bento":
      return (
         <Card className="relative flex w-full max-w-[380px] items-center justify-center border-none bg-left p-0 text-center backdrop-blur-2xl">
          <CardContent className="relative h-full w-full rounded-[12px]  p-8">
            
           

            {/* Story */}
            <span
              className="relative z-10 block p-4 text-lg font-medium leading-8"
              style={{ color: txtcolor }}
            >
              {story}
            </span>

           
          </CardContent>
        </Card>
      );

    /* 🖍️ Pastel-Scrapbook — soft rounded note card */
    case "pastel-scrapbook":
      return (
        <div className="py-4">
          <div className="mx-auto w-full max-w-[380px] rounded-2xl border border-white/40 bg-white/60 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            <Quote className="h-4 w-4 opacity-40" style={{ color: "#a855f7" }} strokeWidth={1.5} />
            <p className="mt-1 text-sm leading-7" style={{ color: txtcolor }}>
              {story}
            </p>
          </div>
        </div>
      );

    /* ⭐ Sticker-Pop — bold outlined sticker */
    case "sticker-pop":
      return (
        <div className="py-5">
          <div
            className="mx-auto w-full max-w-[380px] rounded-2xl border-[3px] bg-white px-6 py-5"
            style={{
              borderColor: txtcolor,
              boxShadow: "6px 6px 0 rgba(0,0,0,0.9)",
            }}
          >
            <span className="block text-[10px] font-black uppercase tracking-widest" style={{ color: "#f97316" }}>
              my story
            </span>
            <p className="mt-1 text-base font-bold leading-7" style={{ color: "#1e293b" }}>
              {story}
            </p>
          </div>
        </div>
      );

    /* 🏛️ Classic — default glassy quote card */
    case "classic":
    default:
      return (
        <Card className="relative flex w-full max-w-[380px] items-center justify-center border-none bg-left p-0 text-center backdrop-blur-2xl">
          <CardContent className="relative h-full w-full rounded-[12px] bg-black/50 p-8">
            {/* Top-left quote */}
            <Quote
              className="absolute -left-2 -top-2 h-10 w-10 opacity-30"
              strokeWidth={1.5}
            />

            {/* Story */}
            <span
              className="relative z-10 block p-4 text-lg font-medium leading-8"
              style={{ color: txtcolor }}
            >
              {story}
            </span>

            {/* Bottom-right quote */}
            <Quote
              className="absolute -bottom-2 -right-2 h-10 w-10 rotate-180 opacity-30"
              strokeWidth={1.5}
            />
          </CardContent>
        </Card>
      );
  }
}

export default Story;
