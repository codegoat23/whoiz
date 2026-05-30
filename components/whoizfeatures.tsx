"use client"

import { cn } from "@/lib/utils"
import { Image, Grid3X3, BookOpen, Link2 } from "lucide-react"

const features = [
  {
    icon: Image,
    title: "Create a stunning profile",
    description:
      "Design a clean, beautiful profile that truly represents who you are — your identity, your style, your presence.",
  },
  {
    icon: Grid3X3,
    title: "Memories galleries",
    description:
      "Turn moments into memories. Upload photos, organize them into galleries, and let people experience your journey visually.",
  },
  {
    icon: BookOpen,
    title: "Share your story",
    description:
      "Tell your story in your own words. From short bios to deeper thoughts, Whoiz gives you space to be real.",
  },
  {
    icon: Link2,
    title: "One powerful link",
    description:
      "Share everything about you using one simple link. Easy to remember, easy to share, easy to grow.",
  },
]

export default function WhoizFeatures() {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em]">
            Everything about you, in one place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Whoiz helps you express yourself, preserve your memories, and share your world — all through one simple link.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className={cn(
                "group rounded-3xl border p-8",
                "transition-all hover:shadow-lg"
              )}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent">
                <feature.icon className="h-6 w-6" />
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
