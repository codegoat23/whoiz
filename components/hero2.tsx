import React from "react";
import HeroPreviewCard from "./PreviewCardSect";
import PhotoStack from "./PhotoStack";
import Image from "next/image";


function Hero2() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient Orange Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[180px] rounded-full " />

      <div className="grid max-w-screen-xl px-4 sm:px-6 py-16 sm:py-20 mx-auto lg:grid-cols-12 items-center relative">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          {/* Title */}
          <h1 className="max-w-xl mb-5 text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white">
            Tell the{" "}
            <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
              world
            </span>{" "}
            who you are
          </h1>

          {/* Subtitle */}
          <p className="max-w-xl mb-8 text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed">
            Share your vibe, story, projects, and skills without limits — your
            identity, beautifully packaged.
          </p>

          {/* INPUT CARD */}
          <form className="flex flex-col sm:flex-row w-full max-w-lg gap-3">
            <div className="flex items-center flex-1 min-w-0 rounded-3xl px-4 py-3 border border-orange-500/30 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(249,115,22,0.25)] focus-within:ring-2 focus-within:ring-orange-400/40 transition">

              {/* Icon */}
              <div className="flex items-center pr-2 shrink-0">
                <Image
                  src="/logos/logo2.svg"
                  alt="WHOIZ"
                  width={20}
                  height={20}
                  className="w-5 h-5 sm:w-6.5 sm:h-6.5"
                />
              </div>

              <span className="text-orange-500 text-sm select-none mr-1 shrink-0">
                whoiz.space/
              </span>

              <input
                type="text"
                id="username"
                placeholder="yourname"
                className="flex-1 min-w-0 bg-transparent outline-none text-white text-sm placeholder:text-gray-500"
                required
              />
            </div>
            <button
              type="button"
              className="shrink-0 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-full px-6 py-3 text-sm font-medium hover:shadow-orange-500/50 hover:scale-[1.03] transition active:scale-95"
            >
              Create
            </button>
          </form>
          
        </div>

        {/* RIGHT VISUAL → REPLACED */}
        <div className="hidden lg:flex lg:col-span-5 justify-center">
         <PhotoStack />
        </div>

      </div>
    </section>
  );
}

export default Hero2;