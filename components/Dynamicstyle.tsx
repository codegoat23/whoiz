import React from "react";

function Dynamicstyle() {
  return (
    <section className="relative flex flex-col items-center mt-24 md:mt-40 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Glow (responsive positioning) */}
      <div className="absolute top-24 md:top-32 left-1/2 -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-[#E83718]/20 blur-[100px] md:blur-[140px] rounded-full" />

      {/* Text Content */}
      <div className="max-w-3xl md:max-w-4xl text-center z-10">
        <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold text-white leading-tight">
          Dynamic Styling
          <br />
          Theme Selection
        </span>

        <p className="mt-4 md:mt-6 text-zinc-400 text-sm sm:text-base md:text-lg">
          Transform your portfolio into a unique digital identity.
          <br className="hidden sm:block" />
          Choose stunning themes and personalize them with your own imagery.
        </p>
      </div>

      {/* Theme Showcase */}
      <div className="relative mt-12 md:mt-20 flex flex-row sm:flex-row items-center justify-center gap-6 sm:gap-4 md:gap-6 z-10">
        
        {/* Left Card */}
        <div className="group">
          <div className="h-[150px] w-[130px] sm:h-[180px] sm:w-[160px] md:h-[240px] md:w-[220px] rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_40px_rgba(232,55,24,0.15)] rotate-0 sm:rotate-[-6deg] translate-y-0 sm:translate-y-6 transition-all duration-500 hover:-translate-y-2">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/3.webp')" }}
            />
          </div>
        </div>

        {/* Featured Card */}
        <div className="relative group z-20">
          
          {/* Glow */}
          <div className="absolute inset-0 bg-[#FF6B35]/25 blur-2xl md:blur-3xl rounded-full" />

          <div className="relative h-[180px] w-[160px] sm:h-[220px] sm:w-[190px] md:h-[280px] md:w-[260px] overflow-hidden rounded-[30px] md:rounded-[36px] border border-white/20 shadow-[0_0_60px_rgba(232,55,24,0.25)]">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/titaniumBlack.webp')" }}
            />
          </div>

          {/* Badge */}
          <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2">
            <div className="px-3 md:px-4 py-1 md:py-2 rounded-full border border-[#FF8A3D]/30 bg-[#E83718]/10 backdrop-blur-md text-[#FFB067] text-[10px] md:text-xs font-semibold shadow-lg">
              Most Popular
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="group">
          <div className="h-[150px] w-[130px] sm:h-[180px] sm:w-[160px] md:h-[240px] md:w-[220px] rounded-[28px] md:rounded-[32px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_40px_rgba(232,55,24,0.15)] rotate-0 sm:rotate-[6deg] translate-y-0 sm:translate-y-6 transition-all duration-500 hover:-translate-y-2">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/themes/orange.webp')" }}
            />
          </div>
        </div>
      </div>

      {/* CTA */}
      <button className="mt-10 md:mt-14 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#E83718] via-[#FF6B35] to-[#FF8A3D] px-6 md:px-8 py-3 md:py-4 text-xs md:text-sm font-semibold text-white shadow-[0_10px_40px_rgba(232,55,24,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_60px_rgba(232,55,24,0.45)]">
        <span className="relative z-10">Pick Your Theme</span>
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-white/10" />
      </button>
    </section>
  );
}

export default Dynamicstyle;