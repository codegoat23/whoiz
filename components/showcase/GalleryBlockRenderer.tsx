'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { GalleryImage } from '@/lib/type';
import Lightbox from './Lightbox';

interface GalleryBlockRendererProps {
  images: GalleryImage[];
  caption?: string | null;
}

export default function GalleryBlockRenderer({
  images,
  caption,
}: GalleryBlockRendererProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video rounded-2xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
        Empty gallery
      </div>
    );
  }

  const urls = images.map((img) => img.url);
  const count = images.length;

  return (
    <figure className="my-2">
      {/* 1 image — full-width featured */}
      {count === 1 && (
        <div
          className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <img
            src={urls[0]}
            alt={caption || ''}
            className="w-full object-cover max-h-[600px] transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>
      )}

      {/* 2 images — balanced columns */}
      {count === 2 && (
        <div className="grid grid-cols-2 gap-2">
          {urls.map((url, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* 3 images — 1 featured + 2 smaller */}
      {count === 3 && (
        <div className="grid grid-cols-2 gap-2">
          <div
            className="relative row-span-2 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={urls[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(1)}
          >
            <img
              src={urls[1]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
          <div
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(2)}
          >
            <img
              src={urls[2]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        </div>
      )}

      {/* 4 images — elegant 2x2 */}
      {count === 4 && (
        <div className="grid grid-cols-2 gap-2">
          {urls.map((url, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      )}

      {/* 5+ images — editorial grid */}
      {count >= 5 && (
        <div className="grid grid-cols-3 gap-2">
          {/* First image spans 2 rows */}
          <div
            className="relative row-span-2 aspect-[3/4] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={urls[0]}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Images 1..4 fill the remaining 2-column grid */}
          {urls.slice(1, 5).map((url, i) => (
            <div
              key={i + 1}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setLightboxIndex(i + 1)}
            >
              <img
                src={url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}

          {/* Remaining images in a bottom row */}
          {count > 5 && (
            <div className="col-span-3 grid grid-cols-3 gap-2">
              {urls.slice(5).map((url, i) => (
                <div
                  key={i + 5}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setLightboxIndex(i + 5)}
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                  {/* Overflow count badge on last visible tile */}
                  {i === urls.slice(5).length - 1 && count > 8 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">
                        +{count - 8}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Caption */}
      {caption && (
        <figcaption className="mt-3 text-sm text-muted-foreground text-center px-4">
          {caption}
        </figcaption>
      )}

      {/* Image count */}
      {count > 1 && (
        <div className="mt-2 text-center">
          <span className="text-xs text-muted-foreground/60 tabular-nums">
            {count} images
          </span>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={urls}
          startIndex={lightboxIndex}
          alt={caption || ''}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </figure>
  );
}
