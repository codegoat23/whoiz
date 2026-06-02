import React from "react";

export default function BuiltForEveryone() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px]  blur-[180px] rounded-full" />
      <div className="absolute bottom-[-120px] right-0 w-[400px] h-[400px] bg-orange-400/10 blur-[140px] rounded-full" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-6 px-4 py-2 rounded-full border border-orange-400/20 bg-white/5 backdrop-blur-md text-orange-200 text-xs tracking-wide">
          Inclusive by design
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
          Built for{" "}
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
            everyone
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
          Whether you're a student, creator, developer, or entrepreneur — Whoiz
          gives you a space to express your identity without limits.
        </p>

        {/* Feature chips */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">

          <span className="px-4 py-2 rounded-full text-xs sm:text-sm
                           bg-white/5 border border-orange-400/20 text-orange-100
                           backdrop-blur-md hover:bg-orange-500/10 transition">
            No coding required
          </span>

          <span className="px-4 py-2 rounded-full text-xs sm:text-sm
                           bg-white/5 border border-orange-400/20 text-orange-100
                           backdrop-blur-md hover:bg-orange-500/10 transition">
            Works for all devices
          </span>

          <span className="px-4 py-2 rounded-full text-xs sm:text-sm
                           bg-white/5 border border-orange-400/20 text-orange-100
                           backdrop-blur-md hover:bg-orange-500/10 transition">
            Fully customizable
          </span>

          <span className="px-4 py-2 rounded-full text-xs sm:text-sm
                           bg-white/5 border border-orange-400/20 text-orange-100
                           backdrop-blur-md hover:bg-orange-500/10 transition">
            Built for creators
          </span>

        </div>

        {/* Bottom glow line */}
        <div className="mt-14 w-full h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent" />

        {/* Closing line */}
        <p className="mt-6 text-xs text-orange-100/50">
          Simple tools. Infinite expression.
        </p>

      </div>
    </section>
  );
}