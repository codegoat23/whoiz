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
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

const MAX_SIZE_MB = 5;

interface ImageSelectorProps {
  initialImageUrl?: string | null;
  onFileChange?: (file: File | null) => void;
  className?: string;
}

function ImageSelector({
  initialImageUrl,
  onFileChange,
  className = '',
}: ImageSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [preview, setPreview] = useState<string | null>(initialImageUrl ?? null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, []);

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

  const handleFile = (file: File) => {
    if (!validateFile(file)) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    setSelectedFile(file);
    setPreview(url);
    onFileChange?.(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setSelectedFile(null);
    setPreview(initialImageUrl ?? null);
    onFileChange?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`w-full max-w-md ${className}`}>
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
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[400px] h-[400px] blur-[140px] rounded-full" />
        </div>

        <CardHeader className="flex flex-col items-center gap-3 text-center relative z-10">
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
            Showcase Image
          </CardTitle>

          <CardDescription className="text-white/40 text-xs">
            Drag & drop or click to upload PNG, JPG, WEBP
          </CardDescription>
        </CardHeader>

        {!preview && (
          <div className="text-center text-xs text-white/30 px-6">
            Drop your image anywhere inside this panel
          </div>
        )}

        <CardContent className="flex gap-3 items-center justify-center relative z-10 pb-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />

          <Button
            onClick={() => inputRef.current?.click()}
            className="
              rounded-xl font-medium
              bg-white
              text-black
              hover:from-orange-400 hover:to-amber-300
              transition-all
            "
          >
            <CloudUpload className="w-4 h-4" />
            {selectedFile ? 'Replace Image' : 'Select Image'}
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

export default ImageSelector;
