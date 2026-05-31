'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import EmptyState from './EmptyState';
import ProductsTable from './ProductsTable';
import { Product } from '@/lib/type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  

  // 🔥 Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔎 Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" w-full h-full">
      <Card className=" w-full h-full border-none bg-transparent">
        <CardHeader className="justify-end">
          <div className="flex flex-row gap-2">
           
            

  <Button
  
  className="bg-[#ffffff] border font-regular text-sm hover:bg-[#ffffff]/90"
  
  onClick={() => {
   
    router.push('/admin/showcase/add-showcase');
  }}
>
  Add Showcase
</Button>
          </div>
        </CardHeader>

        <CardContent className="overflow-y-auto custom-scrollbar p-0 ">
          {loading ? (
            <p className="text-muted-foreground text-sm">
              Loading showcases...
            </p>
          ) : filteredProducts.length === 0 ? (
            <EmptyState
              message="Add your first digital showcases"
              ButtonText="Add Showcase"
            />
          ) : (
            <ProductsTable products={filteredProducts} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Products;
