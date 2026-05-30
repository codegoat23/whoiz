"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

const avatars = [
  "/stefan.jpg",
  "/ray.jpg",
  "/toa.jpg",
  "/eric.jpg",
  
]

export default function FloatingAvatars() {
  return (
    <div className="relative mx-auto h-40 w-full max-w-md">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center">
          {avatars.map((src, i) => (
            <div
              key={src}
              className={cn(
                "relative -ml-3 rounded-full    ",
                "animate-float-soft"
              )}
              style={{
                width: 44,
                height: 44,
                animationDelay: `${i * 0.4}s`,
                zIndex: avatars.length - i,
              }}
            >
              <img
                src={src}
                alt="avatar"
                
                className="rounded-full object-cover h-10 w-10"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
