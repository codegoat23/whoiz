
import WhoizCTA from "@/components/CTA";
import Dynamicstyle from "@/components/Dynamicstyle";
import WhoizHeroBlock from "@/components/Example";
import FAQ from "@/components/faq";
import FeatureButton from "@/components/FeatureButton";
import AboutWhoiz from "@/components/Features";
import WhoizFooter from "@/components/footer";
import Hero from "@/components/hero";
import HowItWorks from "@/components/howitworks";
import PortfolioSection from "@/components/PortfolioSection";
import Products from "@/components/products";
import WhoizSteps from "@/components/steps";
import Testimonials from "@/components/testimonials";
import Typograph from "@/components/typograph";
import WhoizFeatures from "@/components/whoizfeatures";
import Steps from "@/components/whoizsteps";
import Widgets from "@/components/widgets";
import Image from "next/image";

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
