'use client';

import { Button } from '@/components/ui/button';
import { Search, Plus, LayoutGrid } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ProductsTable from './ProductsTable';
import { Showcase } from '@/lib/type';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Showcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/showcases');
        if (!res.ok) throw new Error('Failed to fetch showcases');
        const data = await res.json();
        setProducts(data);
      } catch {
        toast.error('Failed to load showcases');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const publishedCount = products.filter((p) => p.action === 'Publish').length;
  const draftCount = products.filter((p) => p.action === 'Draft').length;

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-xl bg-accent border border-border">
                <LayoutGrid className="size-4 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Showcases</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {loading ? '...' : `${publishedCount} published · ${draftCount} draft`}
                </p>
              </div>
            </div>

            <Button
              onClick={() => router.push('/admin/showcase/add-showcase')}
              className="rounded-xl font-medium bg-white text-black hover:bg-white/90 transition-all"
            >
              <Plus className="size-4 mr-1.5" />
              New Showcase
            </Button>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-3 py-2.5 w-full sm:w-[320px] transition-colors focus-within:hover:border-border">
            <Search className="size-4 text-muted-foreground shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search showcases..."
              className="w-full bg-transparent text-sm text-foreground/80 placeholder:text-muted-foreground/70 outline-none"
            />
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-accent overflow-hidden"
              >
                <div className="aspect-[16/10] bg-accent animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse" />
                  <div className="h-3 w-1/2 bg-white/10 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex items-center justify-center size-14 rounded-2xl bg-accent border border-border mb-5">
              <LayoutGrid className="size-6 text-muted-foreground/70" />
            </div>
            <div className="text-muted-foreground text-sm font-medium mb-1">
              {search ? 'No matches found' : 'No showcases yet'}
            </div>
            <div className="text-muted-foreground/70 text-xs mb-5">
              {search
                ? 'Try a different search term'
                : 'Start building your digital presence'}
            </div>
            {!search && (
              <Button
                onClick={() => router.push('/admin/showcase/add-showcase')}
                className="rounded-xl bg-accent border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
              >
                <Plus className="size-4 mr-1.5" />
                Create your first showcase
              </Button>
            )}
          </div>
        )}

        {/* Grid */}
        {!loading && filteredProducts.length > 0 && (
          <ProductsTable products={filteredProducts} />
        )}
      </div>
    </div>
  );
}

export default Products;
