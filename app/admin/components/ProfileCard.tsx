"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import React, { useState } from "react";
import ProfileImageButton from "./ProfileButton";
import { toast } from "sonner";

interface QuickViewProps {
  id: string;
  fullname: string;
  bio?: string | null;
  story?: string | null;
  avatarUrl?: string | null
}

function ProfileCard({ fullname, bio, story, id,avatarUrl }: QuickViewProps) {
  const [fullName, setFullName] = useState(fullname);
  const [bioState, setBioState] = useState(bio ?? "");
  const [storyState, setStoryState] = useState(story ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage(null);
      setError(null);

      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name: fullName,
          bio: bioState,
          story: storyState,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setMessage("Profile updated successfully ✅");
      
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      toast.info(message)
      setLoading(false);
    }
  };

  return (
    <div className="h-full  w-full text-white  ">
      <Card className="h-full w-full  space-y-4  border-none bg-transparent p-0 lg:p-6">
        <CardHeader className="p-0">
          <CardTitle className="text-2xl">Profile</CardTitle>
        </CardHeader>

        <div className="space-y-2  flex flex-col gap-10">
           <div className="flex gap-5 w-full items-center ">
            
            <ProfileImageButton avatarUrl={avatarUrl}/>
            <span className="text-[11px] flex-1 min-w-0">Update your avatar by clicking the image 288x288 px size recommended in PNG or JPG format only.</span>
         </div>
         
          <div className="flex flex-col gap-5 items-center justify-center">
    <TextField
  label="Display Name"
  value={fullName}
  onChange={(e) => setFullName(e.target.value)}
  placeholder="Your full name"
  fullWidth
  variant="outlined"
  size="small"
  sx={{
    "& .MuiInputLabel-root": {
      color: "#9ca3af", // gray
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#9ca3af", // keep gray when focused
    },
    "& .MuiOutlinedInput-root": {
      height: "48px",
      borderRadius: "12px",
      fontSize: "0.875rem",
      color: "#ffffff",
      "& fieldset": {
        borderColor: "#e5e7eb",
      },
      "&:hover fieldset": {
        borderColor: "#ff5e47",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff5e47",
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 16px",
    },
  }}
/>

           
            
          </div>
        </div>
           <div className="space-y-2  ">
          
          
          
        
        </div>

        <div className="space-y-2">
          
    <TextField
  label="Bio"
  value={bioState}
  onChange={(e) => setBioState(e.target.value)}
  placeholder="Your full name"
  fullWidth
  variant="outlined"
  size="small"
  sx={{
    "& .MuiInputLabel-root": {
      color: "#9ca3af",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#9ca3af",
    },
    "& .MuiOutlinedInput-root": {
      height: "48px",
      borderRadius: "12px",
      fontSize: "0.875rem",
      color: "#ffffff",
      "& fieldset": {
        borderColor: "#e5e7eb",
      },
      "&:hover fieldset": {
        borderColor: "#ff5e47",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff5e47",
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "12px 16px",
    },
  }}
/>
         
        
        </div>

        
          
<div className="relative w-full">
  <Textarea
    value={storyState}
    onChange={(e) => setStoryState(e.target.value)}
    placeholder=" "
    className="peer min-h-[100px] resize-none rounded-md border border-input bg-transparent px-3 py-3 text-sm focus:border-gray-900 focus:ring-0"
  />

  <label
    className="
      pointer-events-none absolute left-3 top-3
      text-sm text-muted-foreground
      transition-all duration-200
      peer-placeholder-shown:top-3.5
      peer-placeholder-shown:text-sm
      peer-focus:-top-2
      peer-focus:text-xs
      peer-focus:text-gray-900
      peer-focus:bg-background
      peer-focus:px-1
    "
  >
   Your story
  </label>
</div>

        
       

        <div className="flex justify-end pt-2">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save changes"}
          </Button>
        </div>

        
      </Card>
    </div>
  );
}

export default ProfileCard;
