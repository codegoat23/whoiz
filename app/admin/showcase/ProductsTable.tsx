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
    <div className='w-full'>
      <Table className='w-full '>
        <TableHeader className="bg-[#a1a1a122]">
          <TableRow>
            <TableHead className="w-10 " />
            <TableHead className="text-muted-foreground text-[12px] w-2/3">
              PRODUCTS
            </TableHead>
            <TableHead className="text-muted-foreground text-[12px]">
              STATUS
            </TableHead>
            <TableHead className="text-muted-foreground text-[12px]">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell />
              <TableCell>{product.name}</TableCell>

              {/* STATUS */}
              <TableCell>
                {product.action === 'Publish' ? (
                  <Badge variant="outline" className="text-green-700 p-1 lg:p-0.5">
                    <CircleDotDashed className="text-green-700 lg: md:mr-1" />
                    <span className='hidden lg:block md:block'> Published</span>
                   
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-200"
                  >
                    <CircleDotDashed className="text-red-700 mr-1" />
                    <span className='hidden lg:block md:block'> Unpublished</span>
                   
                  </Badge>
                )}
              </TableCell>

              {/* ACTIONS */}
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-36 p-1">
                    {/* EDIT */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-blue-500"
                      onClick={() => handleEdit(product.id)}
                    >
                      <Edit size={14} />
                      Edit
                    </Button>

                    {/* DELETE */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2 text-red-500"
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
  );
}

export default ProductsTable;
