'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Product } from '@/lib/type';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ShowcaseProps {
  products: Product[];
  username: string| null;
}

function Showcase({ products, username }: ShowcaseProps) {
  if (!products || products.length === 0) return null;

  const hasMore = products.length > 2;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const p = 1 - rect.top / windowHeight;
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const total = Math.min(products.length, 3);
  const radius = 130;

  const isHoverMode = hoveredId !== null;

  return (
    <div className="flex flex-col items-center mt-6 gap-4 w-full">
      <span className="font-extrabold">Showcase</span>

      {/* 🌌 STAGE */}
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-[340px] flex items-center justify-center"
        style={{
          perspective: '1000px', // 👈 enables depth realism
        }}
      >
        {products.slice(0, 3).map((product, index) => {
          const isStack = progress < 0.5;
          const isFan = progress >= 0.5 && progress < 1.2;
          const isArc = progress >= 1.2;

          let transform = '';

          // 💤 STACK MODE
          if (isStack) {
            transform = `
              translate(${index * 10}px, ${index * 10}px)
              rotate(${index * 2}deg)
            `;
          }

          // 🌬️ FAN MODE
          else if (isFan) {
            transform = `
              translate(${(index - 1) * 90}px, ${Math.abs(index - 1) * 25}px)
              rotate(${(index - 1) * 10}deg)
            `;
          }

          // 🪐 ARC MODE (BREATHING)
          else {
            const angleStep = Math.PI / (total - 1 || 1);
            const angle = index * angleStep - Math.PI / 2;

            const breathe = Math.min((progress - 1.2) * 80, 80);
            const dynamicRadius = radius + breathe;

            const x = Math.cos(angle) * dynamicRadius;
            const y = Math.sin(angle) * dynamicRadius;

            const scale = 1 - Math.abs(index - 1) * 0.1;

            const spacingOffset = index * 6;

            transform = `
              translate(${x + spacingOffset}px, ${y}px)
              rotate(${angle}rad)
              scale(${scale})
            `;
          }

          // 🧠 HOVER OVERRIDE (ROW MODE)
          if (isHoverMode) {
            const hoveredIndex = products.findIndex(p => p.id === hoveredId);
            const offset = index - hoveredIndex;

            transform = `
              translateX(${offset * 180}px)
              translateY(0px)
              rotate(0deg)
              scale(${hoveredId === product.id ? 1.15 : 0.95})
            `;
          }

          return (
            <Card
              key={product.id}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="absolute w-[70%] rounded-2xl p-3 border shadow-lg transition-all duration-500 ease-out"
              style={{
                zIndex: hoveredId === product.id ? 999 : 10 - index,
                opacity: hoveredId && hoveredId !== product.id ? 0.85 : 1,
                transform,
              }}
            >
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-40 w-full rounded-xl object-cover"
                />
              ) : (
                <div className="h-40 rounded-xl bg-muted flex items-center justify-center text-xs">
                  No image
                </div>
              )}

              <div className="mt-2 flex justify-between items-center">
                <span className="text-[10px] truncate">
                  {product.name}
                </span>

                <Link href={`/${username}/products/${product.id}`}>
                  <Button size="sm" className="text-[11px] h-7 bg-[#1b89e3]">
                    view
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>

      {/* VIEW MORE */}
      {hasMore && (
        <Link href={`/${username}/products`}>
          <Button variant="outline" className="text-xs mt-2">
            View more
          </Button>
        </Link>
      )}
    </div>
  );
}

export default Showcase;