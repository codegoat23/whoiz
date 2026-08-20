"use client";

import React from "react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

function Dynamicstyle() {
  return (
    <section className="relative flex flex-col items-center mt-16 sm:mt-24 md:mt-40 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] blur-[100px] md:blur-[140px] rounded-full" />

      {/* Text Content */}
      <FadeUp delay={0.1} duration={0.7} className="max-w-3xl md:max-w-4xl text-center z-10">
        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight">
          Dynamic Styling
          <br />
          Theme Selection
        </span>

        <p className="mt-4 md:mt-6 text-zinc-400 text-sm sm:text-base md:text-lg">
          Customize portfolio card into style you want .
          <br className="hidden sm:block" />
          Also  you can add custom images to beautify your portfolio
        </p>
      </FadeUp>

      {/* Theme Showcase */}
      <StaggerContainer stagger={0.15} delay={0.2} className="relative mt-12 md:mt-20 flex flex-row sm:flex-row items-center justify-center gap-6 sm:gap-4 md:gap-6 z-10">
        {/* Left Card */}
        <StaggerItem variant="fadeUp" duration={0.6} className="group">
          <div className="h-[150px] w-[130px] sm:h-[180px] sm:w-[160px] md:h-[240px] md:w-[220px] rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_40px_rgba(232,55,24,0.15)] rotate-0 sm:rotate-[-6deg] translate-y-0 sm:translate-y-6 transition-all duration-500 hover:-translate-y-2">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/3.webp')" }}
            />
          </div>
        </StaggerItem>

        {/* Featured Card */}
        <StaggerItem variant="scaleUp" duration={0.6} className="relative group z-20">
          <div className="absolute inset-0 blur-2xl md:blur-3xl rounded-full" />
          <div className="relative h-[180px] w-[160px] sm:h-[220px] sm:w-[190px] md:h-[280px] md:w-[260px] overflow-hidden rounded-[30px] md:rounded-[36px] border border-white/20 ">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/titaniumBlack.webp')" }}
            />
          </div>
        </StaggerItem>

        {/* Right Card */}
        <StaggerItem variant="fadeUp" duration={0.6} className="group">
          <div className="h-[150px] w-[130px] sm:h-[180px] sm:w-[160px] md:h-[240px] md:w-[220px] rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_40px_rgba(232,55,24,0.15)] rotate-0 sm:rotate-[6deg] translate-y-0 sm:translate-y-6 transition-all duration-500 hover:-translate-y-2">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/orange.webp')" }}
            />
          </div>
        </StaggerItem>
      </StaggerContainer>

      {/* CTA */}
      <FadeUp delay={0.5} duration={0.6}>
        <button className="mt-10 md:mt-14 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E83718] via-[#FF6B35] to-[#FF8A3D] px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-semibold text-white shadow-[0_10px_40px_rgba(232,55,24,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_60px_rgba(232,55,24,0.45)]">
          <span className="relative z-10">Pick Your Theme</span>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />
        </button>
      </FadeUp>
    </section>
  );
}

export default Dynamicstyle;
