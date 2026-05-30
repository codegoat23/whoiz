import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";

import Link from "next/link";
import GlassNavbar from "./navbar";

import Hero2 from "./hero2";

export default function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 ">
     
      <GlassNavbar/>
      <Hero2/>
   
    </div>
  );
}
