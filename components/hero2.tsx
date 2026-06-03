import React from "react";
import HeroPreviewCard from "./PreviewCardSect";
import PhotoStack from "./PhotoStack";


function Hero2() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient Orange Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[180px] rounded-full " />

      <div className="grid max-w-screen-xl px-6 py-20 mx-auto lg:grid-cols-12 items-center relative">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-7 flex flex-col justify-center">

          {/* Title */}
          <h1 className="max-w-xl mb-5 text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight leading-tight text-white">
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
          <form className="max-w-lg">
            <div className="flex items-center rounded-3xl px-4 py-3 border border-orange-500/30 bg-white/5 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(249,115,22,0.25)] focus-within:ring-2 focus-within:ring-orange-400/40 transition">

              {/* Icon */}
              <div className="flex items-center pr-2 text-orange-300">
                <svg
                  className="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Zm0 0c2.5-2.5 4-5.5 4-9s-1.5-6.5-4-9m0 18c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9m9 9H3"
                  />
                </svg>
              </div>

              <span className="text-orange-300 text-sm select-none mr-1">
                whoiz.bio/
              </span>

              <input
                type="text"
                id="username"
                placeholder="yourname"
                className="flex-1 bg-transparent outline-none text-white text-sm placeholder:text-gray-500"
                required
              />

              <button
                type="button"
                className="ml-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white rounded-2xl px-4 py-2 text-xs font-medium shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.03] transition active:scale-95"
              >
                Create
              </button>
            </div>
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