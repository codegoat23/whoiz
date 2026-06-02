import React from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { LuTvMinimal } from "react-icons/lu";

function FeatureButton() {
  return (
    <div className="w-full flex justify-center px-4">
      
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14
                      text-xs sm:text-sm md:text-base text-orange-100/80
                      bg-white/5 backdrop-blur-md border border-orange-400/20
                      rounded-2xl px-4 py-3 shadow-[0_20px_60px_-20px_rgba(249,115,22,0.25)]">

        {/* Item 1 */}
        <div className="flex items-center gap-2 hover:text-orange-300 transition">
          <FaBoltLightning className="text-orange-400 w-5 h-5 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span>No coding required</span>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-2 hover:text-orange-300 transition">
          <BiSolidCustomize className="text-orange-400 w-5 h-5 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span>Easy to customise</span>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-2 hover:text-orange-300 transition">
          <MdUpdate className="text-orange-400 w-5 h-5 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span>Update anytime</span>
        </div>

        {/* Item 4 */}
        <div className="flex items-center gap-2 hover:text-orange-300 transition">
          <LuTvMinimal className="text-orange-400 w-5 h-5 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span>Minimal design</span>
        </div>

      </div>
    </div>
  );
}

export default FeatureButton;