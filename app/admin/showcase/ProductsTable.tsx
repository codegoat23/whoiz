'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Product } from '@/lib/type';
import {
  CircleDotDashed,
  Edit,
  Ellipsis,
  Trash,
} from 'lucide-react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProductsTableProps {
  products: Product[];
  onDelete?: (id: string) => void;
}

function ProductsTable({ products, onDelete }: ProductsTableProps) {
  const router = useRouter();

  /* =========================
     DELETE PRODUCT
     ========================= */
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (!confirmed) return;

    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Delete failed');
      }

      toast.success('Product deleted');
       router.refresh();
      onDelete?.(id);
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete product');
    }
  };

  /* =========================
     EDIT PRODUCT
     ========================= */
  const  handleEdit = (id: string) => {
    router.push(`/admin/showcase/edit/${id}`);
  };

  return (
  <div className="w-full overflow-x-auto">
    
    <div className="
      min-w-[700px]
      rounded-2xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-[0_0_60px_-25px_rgba(255,140,0,0.12)]
      overflow-hidden
    ">
      
      <Table className="w-full">

        {/* HEADER */}
        <TableHeader className="bg-black/40 border-b border-white/10">
          <TableRow>
            <TableHead className="w-10" />
            <TableHead className="text-white/60 text-xs uppercase tracking-wider">
              Products
            </TableHead>
            <TableHead className="text-white/60 text-xs uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="text-white/60 text-xs uppercase tracking-wider text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className="
                border-b border-white/5
                hover:bg-white/5
                transition
              "
            >
              
              <TableCell />

              {/* NAME */}
              <TableCell className="text-white/80 font-medium">
                {product.name}
              </TableCell>

              {/* STATUS */}
              <TableCell>
                {product.action === 'Publish' ? (
                  <Badge
                    variant="outline"
                    className="
                      border-emerald-500/20
                      bg-emerald-500/10
                      text-emerald-300
                      flex items-center gap-1
                      w-fit
                    "
                  >
                    <CircleDotDashed className="w-3 h-3" />
                    Published
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="
                      border-orange-500/20
                      bg-orange-500/10
                      text-orange-300
                      flex items-center gap-1
                      w-fit
                    "
                  >
                    <CircleDotDashed className="w-3 h-3" />
                    Draft
                  </Badge>
                )}
              </TableCell>

              {/* ACTIONS */}
              <TableCell className="text-right">
                <Popover>
                  
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="
                        text-white/50
                        hover:text-orange-300
                        hover:bg-white/5
                        rounded-xl
                      "
                    >
                      <Ellipsis />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="
                      w-40 p-2
                      bg-[#111]/95
                      border border-white/10
                      backdrop-blur-xl
                      rounded-xl
                    "
                  >
                    
                    {/* EDIT */}
                    <Button
                      variant="ghost"
                      className="
                        w-full justify-start gap-2
                        text-white/70
                        hover:bg-white/10 hover:text-orange-300
                        rounded-lg
                      "
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit size={14} />
                      Edit
                    </Button>

                    {/* DELETE */}
                    <Button
                      variant="ghost"
                      className="
                        w-full justify-start gap-2
                        text-white/70
                        hover:bg-white/10 hover:text-red-400
                        rounded-lg
                      "
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash size={14} />
                      Delete
                    </Button>

                  </PopoverContent>
                </Popover>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  </div>
);
}

export default ProductsTable;
