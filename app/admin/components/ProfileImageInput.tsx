"use client";

import { useState } from "react";

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
    formData.append("file", file); // ✅ NO userId

    const res = await fetch("/api/upload/profile", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // Update preview with Cloudinary URL
    if (data?.avatarUrl) {
      setPreview(data.avatarUrl);
      window.location.reload();
    }

    setLoading(false);
    setFile(null);
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
        onClick={handleUpload}
        disabled={!file || loading}
        className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
