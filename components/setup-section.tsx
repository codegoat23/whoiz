"use client";

import { UserPlus, Link2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StarImg from '@/public/star.svg'
import InchWorm from '@/public/InchWorm.svg'
import Sunflower from '@/public/Sunflower.svg'
import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

const steps = [
  { img: StarImg,
    icon: UserPlus,
    step: "Step 1",
    title: "Create your account",
    description:
      "Sign up in seconds and set up your creator workspace. No complicated onboarding.",
  },
  {
    icon: Link2,
    img: InchWorm, 
    step: "Step 2",
    title: "Connect your platforms",
    description:
      "Add TikTok, Instagram, YouTube, X, Twitch and every important link in one place.",
  },
  {
    icon: Rocket,
    step: "Step 3",
    img: Sunflower,
    title: "Start growing",
    description:
      "Share your Whoiz page and turn visitors into followers, customers and fans.",
  },
];

export function SetupSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E83718]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">

        {/* Heading */}
        <FadeUp delay={0.1} duration={0.7} className="mx-auto mb-12 sm:mb-16 max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight md:text-6xl">
            How does Whoiz work?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-muted-foreground">
            Get your creator hub online in just a few simple steps.
          </p>
        </FadeUp>

        {/* Cards */}
        <StaggerContainer stagger={0.15} delay={0.2} className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={index} variant="fadeUp" duration={0.6}>
                <Card className="group border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#E83718]/40">
                  <CardContent className="p-5 sm:p-6">
                    {/* Visual Area */}
                    <div className="mb-6 sm:mb-8 flex h-36 sm:h-48 items-center justify-center rounded-2xl">
                      <Image src={step.img} alt="" width={90} height={90} className="w-20 h-20 sm:w-28 sm:h-28"/>
                    </div>

                    <p className="mb-2 text-sm font-medium text-[#E83718]">
                      {step.step}
                    </p>

                    <h3 className="mb-3 text-xl sm:text-2xl font-semibold">
                      {step.title}
                    </h3>

                    <p className="text-sm sm:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* CTA */}
        <FadeUp delay={0.6} duration={0.6} className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg">
            Get Started
          </Button>

          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </FadeUp>
      </div>
    </section>
  );
}
