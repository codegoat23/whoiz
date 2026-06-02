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
  <div className="w-full min-h-full p-4 sm:p-6">
    
    <Card className="
      w-full h-full
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      shadow-[0_0_60px_-25px_rgba(255,140,0,0.15)]
      rounded-2xl
    ">
      
      {/* Header */}
      <CardHeader className="p-4 sm:p-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Title + Search */}
          <div className="flex flex-col gap-3 w-full sm:w-auto">
            <h2 className="text-lg font-semibold text-white/90">
              Showcases
            </h2>

            {/* Search */}
            <div className="
              flex items-center gap-2
              bg-black/40
              border border-white/10
              rounded-xl px-3 py-2
              w-full sm:w-[280px]
            ">
              <Search className="size-4 text-white/40" />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search showcases..."
                className="
                  w-full bg-transparent
                  text-sm text-white/80
                  placeholder:text-white/30
                  outline-none
                "
              />
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => router.push('/admin/showcase/add-showcase')}
            className="
              rounded-xl font-medium
              bg-gradient-to-r from-orange-500 to-amber-400
              text-black
              shadow-[0_0_25px_rgba(255,140,0,0.25)]
              hover:from-orange-400 hover:to-amber-300
              transition-all
            "
          >
            Add Showcase
          </Button>

        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        
        {/* Loading */}
        {loading && (
          <div className="space-y-3">
            <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-64 bg-white/10 rounded animate-pulse" />
            <div className="h-4 w-52 bg-white/10 rounded animate-pulse" />
          </div>
        )}

        {/* Empty */}
        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-white/50 text-sm mb-2">
              No showcases yet
            </div>
            <div className="text-white/30 text-xs mb-4">
              Start building your digital presence
            </div>

            <Button
              onClick={() => router.push('/admin/showcase/add-showcase')}
              className="
                rounded-xl
                bg-white/5 border border-white/10
                text-white/70
                hover:bg-white/10
              "
            >
              Create your first showcase
            </Button>
          </div>
        )}

        {/* Table */}
        {!loading && filteredProducts.length > 0 && (
          <div className="
            rounded-2xl
            border border-white/10
            bg-black/30
            overflow-hidden
          ">
            <ProductsTable products={filteredProducts} />
          </div>
        )}

      </CardContent>
    </Card>
  </div>
);
}

export default Products;
