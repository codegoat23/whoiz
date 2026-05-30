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
    <div className="w-[50%] h-[75dvh]">
      <Card
        className="h-full rounded-4xl border-dashed border-2 border-[#E83718] bg-[#1f2020]
                   flex flex-col  "
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <CardHeader className="flex flex-col items-center gap-3 text-center">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-xl object-cover"
            />
          ) : (
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          )}

          <CardTitle>Add  Image</CardTitle>
          <CardDescription className=''>
            Drag & drop or click to upload (PNG, JPG, WEBP)
          </CardDescription>
        </CardHeader>

        <CardContent className="flex gap-3 items-center justify-center">
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
            className="bg-[#E83718] hover:bg-[#E83718]/90 text-white"
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? 'Uploading…' : 'Select Image'}
          </Button>

          {preview && (
            <Button
              variant="outline"
              className="text-red-500"
              onClick={handleRemove}
            >
              <Trash2 />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SelectFile;
