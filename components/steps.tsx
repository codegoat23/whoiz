"use client"

import { cn } from "@/lib/utils"
import { Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({
weight: "400",
subsets: ["latin"],
})

const steps = [
  {
    number: "1",
    title: "Whoiz up",
    description:
      "Sign up and customize your profile with your name, bio, and branding to make it uniquely yours.",
  },
  {
    number: "2",
    title: "Story and memories",
    description:
      "Easily add links and don’t forget to tell the world who you are.",
  },
  {
    number: "3",
    title: "Share & Outshine",
    description:
      "Share your Whoiz anywhere — Instagram, TikTok or your website. Track your clicks.",
  },
]

export default function WhoizSteps() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className={cn(
                "relative rounded-3xl bg-[#ff5f57] p-8 text-black",
                "shadow-xl"
              )}
            >
              <div
                     className={cn(
                    permanentMarker.className,
                    "text-6xl font-black leading-none text-white"
                    )}
              >
                {step.number}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
