import React from "react";
import { LuSparkle } from "react-icons/lu";
import starImg from '@/public/star.svg'
import Image from "next/image";

function PortfolioSection() {
  return (
    <section className="relative flex flex-col items-center justify-center mt-28 px-6">
      <Image src={starImg} alt="" className="absolute bottom-20 right-0" width={100} height={100}/>

      {/* Orange Ambient Glow */}
      <div className="absolute top-10 w-[520px] h-[520px]  blur-[160px] rounded-full" />

      <div className="relative flex flex-col items-center gap-6 max-w-5xl w-full text-center">

        {/* Top Line */}
        <span className="text-lg sm:text-xl md:text-2xl text-orange-100/90 font-medium tracking-wide">
          Build a minimal
        </span>

        {/* Divider */}
        <div className="w-full h-px " />

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl md:text-[120px] lg:text-[144px] font-bold text-white tracking-tight leading-none">
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
            PORTFOLIO
          </span>
        </h1>

        {/* Divider */}
        <div className="w-full h-px " />

        {/* Image Card */}
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[360px] rounded-br-[450] overflow-hidden  ">

          {/* Image */}
          <div className="absolute inset-0 bg-[url('/vibrant.png')] bg-cover bg-center scale-105" />

          {/* Orange cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-orange-500/10" />

          {/* Glow edge */}
          <div className="absolute inset-0 ring-1 ring-inset ring-orange-400/20 rounded-3xl" />

          
        </div>

        {/* Bottom Tags */}
        <div className="w-full flex justify-center sm:justify-between gap-6 mt-6 text-orange-100/80 text-xs sm:text-sm md:text-base tracking-wide">
          <span className="text-white transition">Delightful</span>
          <span className="text-white transition">Elegant</span>
          <span className="text-white transition">Simple</span>
        </div>

      </div>
    </section>
  );
}

export default PortfolioSection;