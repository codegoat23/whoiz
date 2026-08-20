"use client";

import React from "react";
import { FaBoltLightning } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";
import { MdUpdate } from "react-icons/md";
import { LuTvMinimal } from "react-icons/lu";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

const features = [
  { icon: FaBoltLightning, label: "No coding required" },
  { icon: BiSolidCustomize, label: "Easy to customise" },
  { icon: MdUpdate, label: "Update anytime" },
  { icon: LuTvMinimal, label: "Minimal design" },
];

function FeatureButton() {
  return (
    <div className="w-full flex justify-center px-4">
      <StaggerContainer
        stagger={0.1}
        delay={0.8}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-10 lg:gap-14 text-xs sm:text-sm md:text-base text-orange-100/80 px-4 py-3"
      >
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <StaggerItem
              key={f.label}
              variant="fadeUp"
              duration={0.5}
              className="flex items-center gap-2 hover:text-orange-300 transition"
            >
              <Icon className="text-orange-400 w-5 h-5 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <span className="text-white">{f.label}</span>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </div>
  );
}

export default FeatureButton;
