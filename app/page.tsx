import BuiltForEveryone from "@/components/buildforeveryone";
import Dynamicstyle from "@/components/Dynamicstyle";
import FeatureButton from "@/components/FeatureButton";
import { FlowDivider } from "@/components/flowdivider";
import WhoizFooter from "@/components/footer";
import Hero from "@/components/hero";
import PortfolioSection from "@/components/PortfolioSection";
import { SetupSection } from "@/components/setup-section";



export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden items-center bg-black">

      <Hero />
    

      <FeatureButton />
     

      <PortfolioSection />
     

      <BuiltForEveryone />
     

      <Dynamicstyle />
      

      <SetupSection />
     

      <WhoizFooter />

    </div>
  );
}