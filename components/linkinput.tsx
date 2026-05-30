"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function WhoizBioInput() {
  const [username, setUsername] = useState("")

  return (
    <div className=" max-w-xs border rounded-4xl sm:w-full mt-10">
      <div className="flex items-center gap-3 rounded-3xl   bg-white/10 backdrop-blur-xl p-2 shadow-lg  rounded-b-4xl sm:w-full">
        <div className="flex flex-1 items-center rounded-3xl bg-black/20 px-3 h-11">
          <span className="mr-2 text-sm text-muted-foreground select-none whitespace-nowrap">
            whoiz.bio/
          </span>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
            className="h-8 text-sm border-0 bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-2xl p-[2px]  " />
          <Button
            type="button"
            className={cn(
              "relative h-11 rounded-4xl px-6",
              "bg-[#FF5E57] text-white",
              "flex items-center justify-center"
            )}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  )
}
