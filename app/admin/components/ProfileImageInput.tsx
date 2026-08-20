"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Camera, Upload, X, Loader2 } from "lucide-react";

const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MIN_DIMENSION = 100;

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, WebP, and GIF images are allowed.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `Image must be under ${MAX_SIZE_MB}MB.`;
  }
  return null;
}

function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error("Could not read image dimensions"));
    };
    img.src = URL.createObjectURL(file);
  });
}

interface ProfileImageInputProps {
  currentAvatarUrl?: string | null;
  onUploaded?: (avatarUrl: string) => void;
}

export default function ProfileImageInput({
  currentAvatarUrl,
  onUploaded,
}: ProfileImageInputProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  function cleanupPreview() {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }

  async function processFile(file: File) {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const dims = await getImageDimensions(file);
      if (dims.width < MIN_DIMENSION || dims.height < MIN_DIMENSION) {
        toast.error(
          `Image must be at least ${MIN_DIMENSION}x${MIN_DIMENSION}px.`
        );
        return;
      }
    } catch {
      toast.error("Could not read image. Please try a different file.");
      return;
    }

    cleanupPreview();
    const url = URL.createObjectURL(file);
    previewUrlRef.current = url;
    setPreview(url);
    setSelectedFile(file);
  }

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;
    e.target.value = "";
    await processFile(selected);
  }

  async function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await processFile(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/upload/profile", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Upload failed");
      }

      if (data?.avatarUrl) {
        toast.success("Profile image updated");
        cleanupPreview();
        setPreview(data.avatarUrl);
        setSelectedFile(null);
        onUploaded?.(data.avatarUrl);
      }
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Failed to upload image";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  function handleRemove() {
    cleanupPreview();
    setPreview(null);
    setSelectedFile(null);
  }

  const displayImage = preview ?? currentAvatarUrl ?? "/themes/liquid.webp";

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Avatar preview */}
      <div className="relative">
        <div className="h-28 w-28 rounded-full overflow-hidden border-2 border-border bg-muted shadow-lg">
          <img
            src={displayImage}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
            <Loader2 className="h-7 w-7 text-white animate-spin" />
          </div>
        )}

        {/* Remove badge */}
        {selectedFile && !loading && (
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-0.5 -right-0.5 h-6 w-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 hover:scale-110 transition-all"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* Drag & drop zone */}
      <input
        ref={inputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleChange}
        className="hidden"
      />

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          w-full rounded-xl border-2 border-dashed p-6 text-center cursor-pointer transition-all
          ${
            dragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-border hover:border-orange-400/50 hover:bg-accent/50"
          }
        `}
      >
        <Camera className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">Click to browse</span>{" "}
          or drag and drop
        </p>
        <p className="mt-1 text-xs text-muted-foreground/70">
          JPG, PNG, WebP, or GIF — max {MAX_SIZE_MB}MB
        </p>
      </div>

      {/* Upload button */}
      {selectedFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Upload photo
            </>
          )}
        </button>
      )}
    </div>
  );
}
