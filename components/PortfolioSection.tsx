import React from "react";
import { LuSparkle } from "react-icons/lu";
import starImg from '@/public/star.svg'
import Image from "next/image";

function PortfolioSection() {
  return (
    <section className="relative flex flex-col items-center justify-center mt-16 sm:mt-28 px-4 sm:px-6 overflow-hidden">
      <Image src={starImg} alt="" className="absolute bottom-10 sm:bottom-20 right-0 w-16 sm:w-24" width={100} height={100}/>

     

      <div className="relative flex flex-col items-center gap-4 sm:gap-6 max-w-5xl w-full text-center">

        {/* Top Line */}
        <span className="text-base sm:text-xl md:text-2xl text-orange-100/90 font-medium tracking-wide">
          Build a minimal
        </span>

        {/* Divider */}
        <div className="w-full h-px " />

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-[100px] lg:text-[120px] font-bold text-white tracking-tight leading-none">
          <span className="bg-gradient-to-r from-orange-300 via-orange-500 to-orange-700 bg-clip-text text-transparent">
            PORTFOLIO
          </span>
        </h1>

        {/* Divider */}
        <div className="w-full h-px " />

        {/* Mockup Logo */}
        <Image
          src="/mockup.png"
          alt="WHOIZ"
          width={500}
          height={80}
          priority
          className="absolute top-50 h-70 sm:h-10 md:h-12 lg:h-100 w-auto object-contain  z-20 -mt-4 sm:-mt-6"
        />

        {/* Image Card */}
        <div className="relative w-full h-[180px] sm:h-[260px] md:h-[360px] rounded-2xl sm:rounded-br-[450px] overflow-hidden z-10 ">

          {/* Image */}
          <div className="absolute inset-0 bg-[url('/vibrant.png')] bg-cover bg-center scale-105" />

          {/* Orange cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/20 to-orange-500/10" />

          {/* Glow edge */}
          <div className="absolute inset-0 ring-1 ring-inset ring-orange-400/20 rounded-3xl" />

          
        </div>

        {/* Bottom Tags */}
        <div className="w-full flex justify-center sm:justify-between gap-4 sm:gap-6 mt-4 sm:mt-6 text-orange-100/80 text-xs sm:text-sm md:text-base tracking-wide">
          <span className="text-white transition">Delightful</span>
          <span className="text-white transition">Elegant</span>
          <span className="text-white transition">Simple</span>
        </div>

      </div>
    </section>
  );
}

export default PortfolioSection;