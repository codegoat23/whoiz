"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Upload, ImagePlus, Loader2, X } from "lucide-react";

const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, and WebP images are allowed.";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return `Image must be under ${MAX_SIZE_MB}MB.`;
  }
  return null;
}

type CustomThemeUploaderProps = {
  onDone?: () => void;
};

export default function CustomThemeUploader({
  onDone,
}: CustomThemeUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

  async function handleSave() {
    if (!selectedFile) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("/api/theme/custom", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to upload");
      }

      toast.success("Custom background applied");
      cleanupPreview();
      setPreview(null);
      setSelectedFile(null);
      onDone?.();
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to upload background";
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

  return (
    <div className="flex flex-col gap-4">
      {/* Preview */}
      {preview && (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-border">
          <Image
            src={preview}
            alt="Theme preview"
            fill
            className="object-cover"
          />
          {!loading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Loader2 className="h-7 w-7 text-white animate-spin" />
            </div>
          )}
        </div>
      )}

      {/* Drop zone */}
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
          flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-6 cursor-pointer transition-all
          ${
            dragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-border hover:border-orange-400/50 hover:bg-accent/50"
          }
        `}
      >
        {preview ? (
          <Upload className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ImagePlus className="h-6 w-6 text-muted-foreground" />
        )}
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {preview ? "Replace image" : "Click to browse"}
          </span>{" "}
          or drag and drop
        </p>
        <p className="text-xs text-muted-foreground/70">
          JPG, PNG, or WebP — max {MAX_SIZE_MB}MB
        </p>
      </div>

      {/* Upload button */}
      {selectedFile && (
        <button
          type="button"
          onClick={handleSave}
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Applying...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Use this background
            </>
          )}
        </button>
      )}
    </div>
  );
}
