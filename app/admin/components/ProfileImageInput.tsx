"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ProfileImageInput() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) return;
    if (selected.size > 2 * 1024 * 1024) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  }

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      if (data?.avatarUrl) {
        setPreview(data.avatarUrl);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to upload profile image");
    } finally {
      setLoading(false);
      setFile(null);
    }
  }

  return (
    <div className="space-y-3">
      <img
        src={preview ?? "/themes/liquid.webp"}
        alt="Preview"
        className="h-24 w-24 rounded-full object-cover"
      />

      <input type="file" accept="image/*" onChange={handleChange} />

      <button
        type="button"
        onClick={handleUpload}
        disabled={!file || loading}
        className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
