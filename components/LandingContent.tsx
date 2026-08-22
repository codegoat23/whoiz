"use client";

import { ReducedMotionProvider } from "@/components/motion-wrapper";
import BuiltForEveryone from "@/components/buildforeveryone";
import DatingHero from "@/components/caursel";
import Dynamicstyle from "@/components/Dynamicstyle";
import FaqSection from "@/components/FaqSection";
import FeatureButton from "@/components/FeatureButton";
import WhoizFooter from "@/components/footer";
import Hero from "@/components/hero";
import { SetupSection } from "@/components/setup-section";

export default function LandingContent() {
  return (
    <ReducedMotionProvider>
      <div className="flex flex-col overflow-x-hidden items-center bg-black">
        <Hero />
        
        <DatingHero />
        <BuiltForEveryone />
        <Dynamicstyle />
        <SetupSection />
        <FaqSection />
        <WhoizFooter />
      </div>
    </ReducedMotionProvider>
  );
}
