"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image as ImageIcon } from "lucide-react";
import ProfileImageInput from "./ProfileImageInput";

export default function ProfileImageButton({
  avatarUrl,
}: {
  avatarUrl?: string | null;
}) {
 


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="Change profile image"
          className="
          border-none
            group relative cursor-pointer
            h-20 w-20
            rounded-full
            overflow-hidden
            transition p-0
            hover:shadow-[0_0_25px_rgba(0,0,0,0.25)]
          "
        >
          <img
            src={avatarUrl ?? "/10.png"}
            alt="Profile"
            className="h-full w-full rounded-full object-cover "
          />

          <div
            className="
              absolute inset-0
              flex items-center justify-center
              opacity-0
              group-hover:opacity-100
              rounded-full
              transition
              backdrop-blur-sm
            "
          >
            <div className="flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[8px] text-white shadow-lg w-full h-full flex justify-center">
              <ImageIcon className="h-4 w-4" />
              
            </div>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change profile image</DialogTitle>
          <DialogDescription>
            <ProfileImageInput />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
