"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function WhoizCTA() {
  return (
    <section className="relative w-full py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ff5f57] via-[#ff6b63] to-[#ff8078] px-8 py-16 text-center text-white shadow-2xl">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-[-0.03em]">
              One link that speaks for you
            </h2>
            <p className="mt-4 text-lg text-white/90">
              Stop explaining yourself everywhere. Create a Whoiz page that shows
              who you are, what you do, and where to find you — all in one place.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className={cn(
                  "rounded-full bg-black px-8 text-white",
                  "hover:bg-black/90"
                )}
              >
                Create your Whoiz
              </Button>
              
            </div>
          </div>

          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-black/20 blur-3xl" />
        </div>
      </div>
    </section>
  )
}
