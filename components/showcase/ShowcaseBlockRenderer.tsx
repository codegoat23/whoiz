import { ShowcaseBlock, GalleryImage } from '@/lib/type';
import { Link2 } from 'lucide-react';
import GalleryBlockRenderer from './GalleryBlockRenderer';

interface ShowcaseBlockRendererProps {
  blocks: ShowcaseBlock[];
}

export default function ShowcaseBlockRenderer({
  blocks,
}: ShowcaseBlockRendererProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: ShowcaseBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base leading-[1.8] text-foreground/85">
          {block.content}
        </p>
      );

    case 'heading':
      return (
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-2">
          {block.content}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground mt-1">
          {block.content}
        </h3>
      );

    case 'image':
      return (
        <figure className="flex flex-col gap-2.5 my-2">
          {block.mediaUrl ? (
            <img
              src={block.mediaUrl}
              alt={block.caption || ''}
              className="w-full rounded-2xl object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full aspect-video rounded-2xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
              No image
            </div>
          )}
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground text-center px-4">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <figure className="flex flex-col gap-2.5 my-2">
          {block.mediaUrl ? (
            <video
              src={block.mediaUrl}
              controls
              preload="metadata"
              className="w-full rounded-2xl"
            />
          ) : (
            <div className="w-full aspect-video rounded-2xl bg-muted flex items-center justify-center text-sm text-muted-foreground">
              No video
            </div>
          )}
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground text-center px-4">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'link':
      return (
        <div className="my-1">
          <a
            href={block.mediaUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all duration-200"
          >
            {block.content || block.mediaUrl || 'Visit link'}
            <Link2 size={15} />
          </a>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-orange-500/60 pl-6 py-3 my-2">
          <p className="text-lg italic text-foreground/80 leading-relaxed">
            {block.content}
          </p>
          {block.caption && (
            <cite className="block mt-2 text-sm text-muted-foreground not-italic">
              — {block.caption}
            </cite>
          )}
        </blockquote>
      );

    case 'gallery': {
      const meta = block.metadata as { images?: GalleryImage[] } | null;
      const images = meta?.images ?? [];
      return (
        <GalleryBlockRenderer
          images={images}
          caption={block.caption}
        />
      );
    }

    default:
      return null;
  }
}
