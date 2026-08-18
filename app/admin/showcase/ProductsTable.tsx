'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Showcase } from '@/lib/type';
import {
  CircleDotDashed,
  Edit,
  Ellipsis,
  ExternalLink,
  Images,
  Trash,
} from 'lucide-react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProductsTableProps {
  products: Showcase[];
  onDelete?: (id: string) => void;
}

function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this showcase?');
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const res = await fetch('/api/showcases', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Delete failed');
      }

      toast.success('Showcase deleted');
      onDelete?.(id);
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete showcase');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/showcase/edit/${id}`);
  };

  const blockCount = (product: Showcase) => {
    return product.blocks?.length ?? 0;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_40px_-12px_rgba(255,140,0,0.12)]"
        >
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] overflow-hidden bg-white/[0.03]">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Images className="size-8 text-white/15" />
                <span className="text-[11px] text-white/25">No cover</span>
              </div>
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              {product.action === 'Publish' ? (
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 bg-emerald-500/15 text-emerald-300 backdrop-blur-md gap-1"
                >
                  <CircleDotDashed className="w-3 h-3" />
                  Published
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="border-orange-500/30 bg-orange-500/15 text-orange-300 backdrop-blur-md gap-1"
                >
                  <CircleDotDashed className="w-3 h-3" />
                  Draft
                </Badge>
              )}
            </div>

            {/* Quick actions on hover */}
            <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70 border border-white/10"
                onClick={() => handleEdit(product.id)}
              >
                <Edit className="size-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white/80 hover:text-white hover:bg-black/70 border border-white/10"
                onClick={() => router.push(`/showcases/${product.id}`)}
              >
                <ExternalLink className="size-3.5" />
              </Button>
            </div>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-sm font-semibold text-white/90 truncate leading-snug">
                {product.name}
              </h3>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 text-white/30 hover:text-white/70 hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <Ellipsis className="size-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  className="w-44 p-1.5 bg-[#111]/95 border border-white/10 backdrop-blur-xl rounded-xl"
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-white/70 hover:bg-white/10 hover:text-orange-300 rounded-lg text-sm h-9"
                    onClick={() => handleEdit(product.id)}
                  >
                    <Edit size={14} />
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-white/70 hover:bg-white/10 hover:text-red-400 rounded-lg text-sm h-9"
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                  >
                    <Trash size={14} />
                    {deletingId === product.id ? 'Deleting...' : 'Delete'}
                  </Button>
                </PopoverContent>
              </Popover>
            </div>

            {product.description ? (
              <p className="text-xs text-white/40 line-clamp-2 leading-relaxed mb-3">
                {product.description}
              </p>
            ) : (
              <p className="text-xs text-white/25 italic mb-3">
                No description
              </p>
            )}

            {/* Footer meta */}
            <div className="flex items-center gap-3 text-[11px] text-white/30">
              {blockCount(product) > 0 && (
                <span className="flex items-center gap-1">
                  <Images className="size-3" />
                  {blockCount(product)} block{blockCount(product) !== 1 ? 's' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductsTable;
