'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

import TextField from '@mui/material/TextField';

import Link from 'next/link';
import { X } from 'lucide-react';

import { Product, ProductAction } from '@/lib/type';
import RichTextEditor from '../../components/richTexteditor';

interface ProductInputProps {
  imageUrl: string | null;
  initialProduct?: Product;
  mode: 'create' | 'edit';
}

export default function ProductInput({
  imageUrl,
  initialProduct,
  mode,
}: ProductInputProps) {
  const router = useRouter();

  const [name, setName] = useState(initialProduct?.name ?? '');
  const [description, setDescription] = useState(initialProduct?.description ?? '');
  const [action, setAction] = useState<ProductAction>(
    initialProduct?.action ?? 'Publish'
  );

  const handleSave = async () => {
    if (!name) {
      toast.error('Product name is required');
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initialProduct?.id,
          name,
          description,
          action,
          imageUrl,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      toast.success(
        mode === 'edit' ? 'Product updated' : 'Product created'
      );

      router.push('/admin/products');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  return (
    <div className="w-[72%]">
      <Card className="p-4 bg-transparent border-none">
        <div className="flex flex-col gap-3">
  <TextField
  label="Title"
  value={name}
  onChange={(e) => setName(e.target.value)}
  fullWidth
  size="small"
  sx={{
    "& .MuiInputLabel-root": {
      color: "#aaa",
    },

    "& .MuiOutlinedInput-root": {
      color: "white",

      "& fieldset": {
        borderColor: "#2E2E2E", // faded gray
        borderWidth: "1px",
        borderRadius: "12px", 
      },

      "&:hover fieldset": {
        borderColor: "#888",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#999",
      },
    },
  }}
/>

          <RichTextEditor value={description} onChange={setDescription} />

          <div className="flex flex-col gap-1">
            <span className="text-sm">Set Action</span>
            <Select value={action} onValueChange={(v) => setAction(v as ProductAction)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Publish">Publish</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline">
              <Link href="/admin/products" className="flex gap-2 items-center">
                <X size={16} />
                Cancel
              </Link>
            </Button>

            <Button onClick={handleSave}>
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
