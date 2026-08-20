"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import ProfileImageInput from "./ProfileImageInput";

export default function ProfileImageButton({
  avatarUrl,
}: {
  avatarUrl?: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);

  function handleUploaded(url: string) {
    setCurrentAvatar(url);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="group relative h-20 w-20 cursor-pointer">
          {/* Avatar */}
          <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-background bg-muted shadow-sm">
            <img
              src={currentAvatar ?? "/10.png"}
              alt="Profile"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Edit button */}
          <Button
            type="button"
            size="icon"
            aria-label="Edit profile image"
            className="
              absolute
              bottom-0
              right-0
              h-7
              w-7
              rounded-full
              border-2
              bg-white
              text-black
              shadow-md
              transition-all
              duration-200
              hover:scale-110
              hover:bg-white/80
            "
          >
            <Pencil className="h-3 w-3" />
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="text-center">
          <DialogTitle>Change profile image</DialogTitle>
        </DialogHeader>

        <div className="pt-2 pb-2">
          <ProfileImageInput
            currentAvatarUrl={currentAvatar}
            onUploaded={handleUploaded}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
