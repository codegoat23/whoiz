import React from "react";
import { LuSparkle } from "react-icons/lu";

function PortfolioSection() {
  return (
    <section className="relative flex flex-col items-center justify-center mt-28 px-6">
      {/* Orange Ambient Glow */}
      <div className="absolute top-10 w-[520px] h-[520px] bg-orange-500/25 blur-[160px] rounded-full" />

      <div className="relative flex flex-col items-center gap-6 max-w-5xl w-full text-center">

        {/* Top Line */}
        <span className="text-lg sm:text-xl md:text-2xl text-orange-100/90 font-medium tracking-wide">
          Build a minimal
        </span>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl md:text-[120px] lg:text-[144px] font-bold text-white tracking-tight leading-none">
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
            PORTFOLIO
          </span>
        </h1>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent" />

        {/* Image Card */}
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(249,115,22,0.35)] border border-orange-500/20">

          {/* Image */}
          <div className="absolute inset-0 bg-[url('/vibrant.png')] bg-cover bg-center scale-105" />

          {/* Orange cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-orange-500/10" />

          {/* Glow edge */}
          <div className="absolute inset-0 ring-1 ring-inset ring-orange-400/20 rounded-3xl" />

          {/* Sparkle */}
          <LuSparkle className="absolute right-6 top-6 text-orange-300 size-10 sm:size-14 md:size-16 drop-shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-pulse" />
        </div>

        {/* Bottom Tags */}
        <div className="w-full flex justify-center sm:justify-between gap-6 mt-6 text-orange-100/80 text-xs sm:text-sm md:text-base tracking-wide">
          <span className="hover:text-orange-300 transition">Delightful</span>
          <span className="hover:text-orange-300 transition">Elegant</span>
          <span className="hover:text-orange-300 transition">Simple</span>
        </div>

      </div>
    </section>
  );
}

export default PortfolioSection;