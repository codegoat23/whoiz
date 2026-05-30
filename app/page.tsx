

import Dynamicstyle from "@/components/Dynamicstyle";

import FeatureButton from "@/components/FeatureButton";

import WhoizFooter from "@/components/footer";
import Hero from "@/components/hero";

import PortfolioSection from "@/components/PortfolioSection";





export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden items-center">
      <Hero/>
      <FeatureButton/>
      <PortfolioSection/>
     <Dynamicstyle/>
     
        
     <WhoizFooter/>
    </div>
  );
}
