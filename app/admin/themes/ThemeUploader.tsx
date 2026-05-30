"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

type CustomThemeUploaderProps = {
  onDone?: () => void;
};

export default function CustomThemeUploader({
  onDone,
}: CustomThemeUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }

    setError(null);
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleSave() {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/theme/custom", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      setError("Failed to upload custom background.");
      toast.error(error)
      setLoading(false);
      return;
    }

    setLoading(false);
    onDone?.();
  }

  return (
    <div className="space-y-4 ">
      {/* Preview */}
      <Card className="border-dashed border-2 lg:border-1 md:border-1 p-6">
      {preview && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden">
          <Image
            src={preview}
            alt="Custom theme preview"
            fill
            className="object-cover"
          />
        </div>
      )}
      
        
          <input
        type="file"
        accept="image/*"
       
        onChange={handleChange}
        className="text-xs "
      />
     
    

      

      <Button
        onClick={handleSave}
        disabled={!file || loading}
        className="w-full cursor-pointer "
      >
        {loading ? "Applying..." : "Use this background"}
      </Button>
      </Card>
    </div>
  );
}
