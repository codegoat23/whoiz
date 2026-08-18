'use client';

import { useEffect, useCallback, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LightboxProps {
  images: string[];
  startIndex?: number;
  alt?: string;
  onClose: () => void;
}

export default function Lightbox({
  images,
  startIndex = 0,
  alt = '',
  onClose,
}: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const go = useCallback(
    (dir: -1 | 1) => {
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, go]);

  const handleLoad = (idx: number) => {
    setLoaded((prev) => ({ ...prev, [idx]: true }));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm tabular-nums">
          {current + 1} / {images.length}
        </div>
      )}

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); go(1); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Image */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {!loaded[current] && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <img
          src={images[current]}
          alt={alt}
          onLoad={() => handleLoad(current)}
          className={cn(
            'max-w-full max-h-[85vh] object-contain rounded-lg transition-opacity duration-300',
            loaded[current] ? 'opacity-100' : 'opacity-0',
          )}
        />
      </div>

      {/* Dots */}
      {images.length > 1 && images.length <= 12 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                i === current
                  ? 'bg-white w-4'
                  : 'bg-white/30 hover:bg-white/50',
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
