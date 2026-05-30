import React from "react";
import { Permanent_Marker } from "next/font/google"
import { cn } from "@/lib/utils";

const permanentMarker = Permanent_Marker({
weight: "400",
subsets: ["latin"],
})

export default function AboutWhoiz() {
  return (
    <section className="relative w-full min-h-screen bg-transparent text-white overflow-hidden px-6 py-20">
      {/* Heading */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-4xl font-semibold">About</h2>
        <p 
         className={cn(
        permanentMarker.className,
        "text-4xl md:text-5xl font-bold text-red-500 italic mt-2"
        )}
        >
          WHOIZ
        </p>
      </div>

      {/* SVG Path */}
      <svg
        viewBox="0 0 1000 1600"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <path
          d="M150 150 C 300 400, 600 200, 700 500 
             S 500 900, 300 800 
             S 200 1200, 800 1400"
          stroke="rgba(239,68,68,0.6)"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto space-y-24">

        {/* Item 1 */}
        <Feature
          title="MORE THAN A LINK"
          text="Whoiz isn't just a place to stack links. It's where your identity lives — show your story, your presence in one clean page that actually feels like you."
          className="md:ml-10"
        />

        {/* Item 2 */}
        <Feature
          title="TELL THEM WHO YOU ARE"
          text="Your name, your vibe, your purpose — all in one link. Whoiz lets you express who you are before anyone even clicks a single button."
          className="md:ml-auto md:text-right"
        />

        {/* Item 3 */}
        <Feature
          title="BUILD FOR YOUR STYLE"
          text="From fashionists to creators and builders. Whoiz adapts to your energy. Customize your look, control your layout, and make your page speak your language."
          className="md:ml-20"
        />

        {/* Item 4 */}
        <Feature
          title="ONE LINK. FULL IDENTITY"
          text="Stop sending people everywhere. With one Whoiz link, everything about you is connected — your work, your socials, your story — all in one place."
          className="md:ml-auto md:text-right"
        />
      </div>

      {/* Dots */}
     
    </section>
  );
}

/* Feature Block */
function Feature({
  title,
  text,
  className = "",
}: {
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`max-w-sm ${className}`}>
      <h3 
       className={cn(
      permanentMarker.className,
      "text-red-500 font-semibold tracking-wide mb-2"
      )}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-gray-300">{text}</p>
    </div>
  );
}

/* Floating Dots */
function Dots() {
  const dots = [
    { top: "18%", left: "15%" },
    { top: "35%", left: "65%" },
    { top: "55%", left: "25%" },
    { top: "75%", left: "70%" },
  ];

  return (
    <>
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute w-4 h-4 bg-red-500 rounded-full"
          style={{ top: dot.top, left: dot.left }}
        />
      ))}
    </>
  );
}
