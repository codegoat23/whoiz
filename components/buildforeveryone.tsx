import React from "react";
import Wawa from "@/public/wawa.svg"
import CurlArrow from '@/public/Shape.svg'
import Image from "next/image";

export default function BuiltForEveryone() {
  return (
    <section className="relative w-full py-24 px-6 overflow-hidden mt-15">
    
      
      {/* Background Glow */}
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px]  blur-[180px] rounded-full" />
      <div className="absolute bottom-[-120px] right-0 w-[400px] h-[400px]  blur-[140px] rounded-full" />

      <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center">

      

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
       
        <div className="flex flex-row mt-10 gap-2">
          <Image src="/avatar/people4.jpg" alt="" className="h-70 w-70 object-cover rounded-full" width={200} height={200}/>
          <Image src="/avatar/people3.jpg" alt="" className="h-70 w-70 object-cover rounded-full" width={280} height={280}/>
          <Image src="/avatar/people2.jpg" alt="" className="h-70 w-70 object-cover rounded-full" width={280} height={280}/>

        </div>
      
      

      </div>
    </section>
  );
}