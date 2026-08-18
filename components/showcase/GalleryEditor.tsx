'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { GalleryImage } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Upload,
  X,
  ChevronUp,
  ChevronDown,
  Loader2,
  ImageIcon,
} from 'lucide-react';

interface GalleryEditorProps {
  images: GalleryImage[];
  caption: string;
  onChange: (images: GalleryImage[]) => void;
  onCaptionChange: (caption: string) => void;
}

export default function GalleryEditor({
  images,
  caption,
  onChange,
  onCaptionChange,
}: GalleryEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const uploaded: GalleryImage[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast.error('Only image files are supported');
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 5MB limit`);
          continue;
        }
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        uploaded.push({ url: data.url, id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 8)}` });
      }
      if (uploaded.length > 0) {
        onChange([...images, ...uploaded]);
      }
    } catch {
      toast.error('Some uploads failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (id: string) => {
    onChange(images.filter((img) => img.id !== id));
  };

  const moveImage = (id: string, dir: -1 | 1) => {
    const idx = images.findIndex((img) => img.id === id);
    if (idx < 0) return;
    const target = idx + dir;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[idx], next[target]] = [next[target], next[idx]];
    onChange(next);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group relative aspect-square rounded-lg overflow-hidden border border-white/10"
            >
              <img
                src={img.url}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/50 text-white/80 hover:text-white"
                    disabled={i === 0}
                    onClick={() => moveImage(img.id, -1)}
                  >
                    <ChevronUp size={12} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/50 text-white/80 hover:text-white"
                    disabled={i === images.length - 1}
                    onClick={() => moveImage(img.id, 1)}
                  >
                    <ChevronDown size={12} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/50 text-white/80 hover:text-red-400"
                    onClick={() => removeImage(img.id)}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>

              {/* Index badge */}
              <span className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded-md bg-black/60 text-white/70 tabular-nums">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className={cn(
          'w-full rounded-lg border border-dashed border-white/20 bg-white/5 flex items-center justify-center gap-2 text-white/40 hover:border-white/40 hover:text-white/60 transition',
          images.length === 0 ? 'h-28' : 'h-16',
        )}
      >
        {uploading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs">Uploading...</span>
          </>
        ) : (
          <>
            <Upload size={16} />
            <span className="text-xs">
              {images.length === 0 ? 'Add images to gallery' : 'Add more'}
            </span>
          </>
        )}
      </button>

      {/* Caption */}
      <Input
        placeholder="Gallery caption (optional)"
        value={caption}
        onChange={(e) => onCaptionChange(e.target.value)}
        className="bg-transparent border-white/10 text-sm"
      />
    </div>
  );
}
