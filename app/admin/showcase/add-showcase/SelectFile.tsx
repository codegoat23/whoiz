'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CloudUpload, Trash2, ImageIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { toast } from 'sonner';

interface SelectFileProps {
  onImageUploaded: (url: string | null) => void;
}

const MAX_SIZE_MB = 5;

function SelectFile({ onImageUploaded }: SelectFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return false;
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`Image must be less than ${MAX_SIZE_MB}MB`);
      return false;
    }

    return true;
  };

  const uploadFile = async (file: File) => {
    if (!validateFile(file)) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      onImageUploaded(data.url);

      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
      setPreview(null);
      onImageUploaded(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    onImageUploaded(null);
    if (inputRef.current) inputRef.current.value = '';
  };

 return (
  <div className="w-full max-w-md h-[75vh]">
    
    <Card
      className="
        h-full rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-[0_0_60px_-25px_rgba(255,140,0,0.18)]
        flex flex-col justify-between
        relative overflow-hidden
      "
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      
      {/* Glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-orange-500/10 blur-[140px] rounded-full" />
      </div>

      {/* Header */}
      <CardHeader className="flex flex-col items-center gap-3 text-center relative z-10">
        
        {/* Preview / Icon */}
        <div className="
          w-40 h-40 rounded-2xl
          border border-white/10
          bg-black/40
          flex items-center justify-center
          overflow-hidden
        ">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-10 h-10 text-white/30" />
          )}
        </div>

        <CardTitle className="text-white/90 text-lg">
          Upload Image
        </CardTitle>

        <CardDescription className="text-white/40 text-xs">
          Drag & drop or click to upload PNG, JPG, WEBP
        </CardDescription>
      </CardHeader>

      {/* Drop zone hint */}
      {!preview && (
        <div className="text-center text-xs text-white/30 px-6">
          Drop your image anywhere inside this panel
        </div>
      )}

      {/* Actions */}
      <CardContent className="flex gap-3 items-center justify-center relative z-10 pb-6">

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) uploadFile(file);
          }}
        />

        <Button
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="
            rounded-xl font-medium
            bg-gradient-to-r from-orange-500 to-amber-400
            text-black
            shadow-[0_0_25px_rgba(255,140,0,0.25)]
            hover:from-orange-400 hover:to-amber-300
            transition-all
          "
        >
          {uploading ? 'Uploading…' : 'Select Image'}
        </Button>

        {preview && (
          <Button
            variant="outline"
            onClick={handleRemove}
            className="
              border-white/10
              bg-white/5
              text-white/60
              hover:bg-white/10 hover:text-red-300
              rounded-xl
              transition
            "
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  </div>
);
}

export default SelectFile;
