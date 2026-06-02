"use client";

import { UserPlus, Link2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    step: "Step 1",
    title: "Create your account",
    description:
      "Sign up in seconds and set up your creator workspace. No complicated onboarding.",
  },
  {
    icon: Link2,
    step: "Step 2",
    title: "Connect your platforms",
    description:
      "Add TikTok, Instagram, YouTube, X, Twitch and every important link in one place.",
  },
  {
    icon: Rocket,
    step: "Step 3",
    title: "Start growing",
    description:
      "Share your Whoiz page and turn visitors into followers, customers and fans.",
  },
];

export function SetupSection() {
  return (
    <section className="relative overflow-hidden py-24">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-40 h-72 w-72 -translate-x-1/2 rounded-full bg-[#E83718]/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground">
            ✨ Setup in minutes
          </div>
        </div>

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            How does Whoiz work?
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Get your creator hub online in just a few simple steps.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <Card
                key={index}
                className="group border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-[#E83718]/40"
              >
                <CardContent className="p-8">
                  {/* Visual Area */}
                  <div className="mb-8 flex h-48 items-center justify-center rounded-2xl border bg-muted/30">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E83718]/10 transition-all group-hover:scale-110">
                      <Icon className="h-8 w-8 text-[#E83718]" />
                    </div>
                  </div>

                  <p className="mb-2 text-sm font-medium text-[#E83718]">
                    {step.step}
                  </p>

                  <h3 className="mb-3 text-2xl font-semibold">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg">
            Get Started
          </Button>

          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}