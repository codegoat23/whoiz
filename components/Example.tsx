"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Instagram, Facebook, Smile, Share2 } from "lucide-react"
import { Card } from "./ui/card"
import { Permanent_Marker } from "next/font/google"

const permanentMarker = Permanent_Marker({
weight: "400",
subsets: ["latin"],
})

export default function WhoizHeroBlock() {
  return (
    <section className="relative mx-auto w-full max-w-6xl rounded-3xl bg-transparent px-6 py-10 text-white">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-center">
        <div className="space-y-5">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span 
             className={cn(
            permanentMarker.className,
            "text-sm tracking-wide text-[#FF5E57]"
            )}
            >WHOIZ</span>
            <span>Tim Cooker</span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-white/80">
            I'm Tim Cooker — a fashionist driven by vision, confidence and detail.
            I don’t just wear clothes, I express identity through style. Every fit
            tells a story, every look carries intention. Fashion for me isn’t about
            trends, it’s about presence, attitude and owning the moment.
          </p>

      

          <Button className="mt-6 w-fit rounded-full bg-[#FF5E57] px-6 text-black hover:bg-orange-400">
            Whoiz up Now
          </Button>
        </div>

        <div className="relative">
              <Card
          className="w-70 rounded-[35px] h-77 flex justify-between items-center p-1 bg-cover bg-[center_0px] border-none"
          style={{
            backgroundImage: `url('/themes/custom.jpg')`,
          }}
        >
<Button
  className="
    relative flex items-center gap-1.5
    px-3 py-1.5
    rounded-4xl
    bg-black/60
    text-[11px] font-medium
    text-gray-100
    backdrop-blur-md
    [animation:softPulse_3s_ease-in-out_infinite]
  "
>
  <Smile className="size-4 text-green-400" />
  let&apos;s connect
</Button>




          <div className="w-68 h-[20%]  p-2 flex flex-row justify-between  bg-black/60 rounded-4xl ">
            <div className="flex flex-row ">
              <div className="w-12 h-12 ">
                <img
                  src='/themes/custom.jpg'
                  className="w-12 h-12 mx-auto rounded-full object-cover"
                  alt=''
                />
              </div>
              <div className="p-2 flex flex-col items-start text-nowrap">
                <span className="text-[11px] text-white"
         >Tim Cooker</span>
                <span className="text-[9px] text-white" >Fashionist</span>
              </div>
            </div>

            <Button className="bg-transparent mt-1 cursor-pointer rounded-4xl h-9"
            
            >
              
              <Share2 />
              Share
            </Button>
          </div>
        </Card>
    <div className="flex flex-col gap-3 max-w-xs absolute top-25 -left-15">
            <Button
              variant="outline"
              className="rounded-full border-orange-500/40 text-white hover:bg-orange-500/10"
            >
              <Instagram className="mr-2 h-4 w-4" /> Follow Me on IG
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-orange-500/40 text-white hover:bg-orange-500/10"
            >
              <Facebook className="mr-2 h-4 w-4" /> Check Me on FB
            </Button>
          </div>

          <div className="absolute -right-4 top-10 overflow-hidden rounded-2xl border border-white/20">
            <Image
              src="/themes/custom.jpg"
              alt="detail"
              width={120}
              height={120}
              className="object-cover"
            />
          </div>

        

          <div className="absolute right-6 bottom-10 max-w-[180px] rounded-2xl bg-orange-500 px-4 py-3 text-xs text-black">
            I'm currently looking forward to being Nirvana fashion show
          </div>
        </div>
      </div>
    </section>
  )
}
