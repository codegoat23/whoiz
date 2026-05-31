"use client";

import { useState, useTransition } from "react";
import { updateUsername } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"
import { Permanent_Marker } from "next/font/google"
import Link from "next/link";

const permanentMarker = Permanent_Marker({
weight: "400",
subsets: ["latin"],
})

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleAction(formData: FormData) {
    startTransition(async () => {
      setError(null);
      try {
        // override username from state for safety
        formData.set("username", username.trim());
        await updateUsername(formData); // server action
      } catch (err: any) {
        const message = err?.message || "Failed to save username";
        setError(message);
        toast.error(message);
      }
    });
  }

  return (
    <div className="w-full h-[86dvh] mt-10  flex justify-center items-center flex-col gap-10">
    {/* onboarding slider */}
      <div className="flex items-center justify-center gap-3">
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 rounded-full bg-[#FF5E57] text-white flex items-center justify-center text-sm font-semibold">
      1
    </div>

    <div className="h-[2px] w-8 bg-[#FF5E57]" />

    <div className="h-8 w-8 rounded-full bg-[#FF5E57] text-white flex items-center justify-center text-sm font-semibold">
      2
    </div>

    <div className="h-[2px] w-8 bg-zinc-700" />

    <div className="h-8 w-8 rounded-full border border-zinc-600 text-zinc-400 flex items-center justify-center text-sm font-semibold">
      3
    </div>
  </div>
</div>
{/* end of onboarding slider */}
      <Card className="p-6 shadow-lg border-none bg-[#1c1a1a] h-2/3 flex flex-col gap-10">
        <div className="flex justify-center">
            <Link href="/"
        className={cn(
permanentMarker.className,
"text-lg tracking-wide text-[#FF5E57] text-center"
)}
        >
          WHOIZ
        </Link>
        </div>
        <div>
        <h1 className="text-2xl font-semibold mb-1">Choose your username</h1>
       
      </div>
         <form action={handleAction} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@</span>
            <Input
              name="username"
              placeholder="eric_dev"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength={3}
              maxLength={20}
              required
              disabled={isPending}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            3–20 characters. Letters, numbers, and underscores only.
          </p>
          {error && (
            <p className="text-xs text-red-500 mt-1">
              {error}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || username.trim().length < 3}
        >
          {isPending ? "Saving..." : "Continue"}
        </Button>
      </form>
      </Card>
      

   
    </div>
  );
}
