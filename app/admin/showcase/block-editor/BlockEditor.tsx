'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Showcase, ShowcaseAction, BlockType, GalleryImage } from '@/lib/type';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Image as ImageIcon,
  Video,
  Link2,
  Quote,
  Type,
  Heading1,
  Heading2,
  Loader2,
  Eye,
  ArrowLeft,
  Upload,
  X,
  Images,
} from 'lucide-react';
import GalleryEditor from '@/components/showcase/GalleryEditor';
import GalleryBlockRenderer from '@/components/showcase/GalleryBlockRenderer';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BlockEditorBlock {
  tempId: string;
  type: BlockType;
  content: string;
  mediaUrl: string | null;
  caption: string;
  metadata: Record<string, unknown> | null;
}

interface BlockEditorProps {
  imageUrl: string | null;
  initialProduct?: Showcase;
  mode?: 'create' | 'edit';
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let tempCounter = 0;
function tempId() {
  return `temp_${Date.now()}_${++tempCounter}`;
}

function blockTypeLabel(t: BlockType) {
  const map: Record<BlockType, string> = {
    paragraph: 'Paragraph',
    heading: 'Heading',
    subheading: 'Subheading',
    image: 'Image',
    video: 'Video',
    link: 'Link',
    quote: 'Quote',
    gallery: 'Gallery',
  };
  return map[t];
}

function blockTypeIcon(t: BlockType) {
  const map: Record<BlockType, React.ReactNode> = {
    paragraph: <Type size={14} />,
    heading: <Heading1 size={14} />,
    subheading: <Heading2 size={14} />,
    image: <ImageIcon size={14} />,
    video: <Video size={14} />,
    link: <Link2 size={14} />,
    quote: <Quote size={14} />,
    gallery: <Images size={14} />,
  };
  return map[t];
}

/* ------------------------------------------------------------------ */
/*  Block Editor                                                       */
/* ------------------------------------------------------------------ */

export default function BlockEditor({
  imageUrl,
  initialProduct,
  mode = 'create',
}: BlockEditorProps) {
  const router = useRouter();

  /* ---- Showcase metadata ---- */
  const [name, setName] = useState(initialProduct?.name ?? '');
  const [action, setAction] = useState<ShowcaseAction>(
    initialProduct?.action ?? 'Publish',
  );

  /* ---- Cover image ---- */
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    imageUrl ?? null,
  );
  const [removeCover, setRemoveCover] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);

  /* ---- Blocks ---- */
  const [blocks, setBlocks] = useState<BlockEditorBlock[]>([]);
  const [blocksLoaded, setBlocksLoaded] = useState(mode === 'create');

  /* ---- UI state ---- */
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [addMenuOpen, setAddMenuOpen] = useState<string | null>(null);

  /* Load existing blocks for edit mode */
  useEffect(() => {
    if (mode !== 'edit' || !initialProduct?.id) return;
    (async () => {
      try {
        const res = await fetch(
          `/api/showcase-blocks?showcaseId=${initialProduct.id}`,
        );
        if (res.ok) {
          const data = await res.json();
          setBlocks(
            data.map((b: any) => ({
              tempId: b.id,
              type: b.type as BlockType,
              content: b.content ?? '',
              mediaUrl: b.mediaUrl ?? null,
              caption: b.caption ?? '',
              metadata: b.metadata ?? null,
            })),
          );
        }
      } catch {
        toast.error('Failed to load blocks');
      } finally {
        setBlocksLoaded(true);
      }
    })();
  }, [mode, initialProduct?.id]);

  /* ---- Cover image handlers ---- */
  const handleCoverFile = useCallback((file: File | null) => {
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
      setRemoveCover(false);
    } else {
      setCoverFile(null);
      setCoverPreview(null);
      setRemoveCover(true);
    }
  }, []);

  /* ---- Block CRUD ---- */
  const addBlock = (type: BlockType, afterTempId?: string) => {
    const newBlock: BlockEditorBlock = {
      tempId: tempId(),
      type,
      content: '',
      mediaUrl: null,
      caption: '',
      metadata: null,
    };

    setBlocks((prev) => {
      if (afterTempId) {
        const idx = prev.findIndex((b) => b.tempId === afterTempId);
        const next = [...prev];
        next.splice(idx + 1, 0, newBlock);
        return next;
      }
      return [...prev, newBlock];
    });
    setAddMenuOpen(null);
  };

  const updateBlock = (
    tempId: string,
    patch: Partial<Omit<BlockEditorBlock, 'tempId'>>,
  ) => {
    setBlocks((prev) =>
      prev.map((b) => (b.tempId === tempId ? { ...b, ...patch } : b)),
    );
  };

  const removeBlock = (tempId: string) => {
    setBlocks((prev) => prev.filter((b) => b.tempId !== tempId));
  };

  const moveBlock = (tempId: string, dir: -1 | 1) => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.tempId === tempId);
      if (idx < 0) return prev;
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  /* ---- Upload helper ---- */
  const uploadFile = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    if (!res.ok) throw new Error('Upload failed');
    const data = await res.json();
    return data.url;
  };

  /* ---- Save ---- */
  const handleSave = async () => {
    if (!name.trim()) {
      toast.error('Showcase title is required');
      return;
    }
    if (isSaving) return;
    setIsSaving(true);

    try {
      /* 1. Upload cover image */
      let finalCover = imageUrl ?? null;
      if (coverFile) {
        finalCover = await uploadFile(coverFile);
      }
      if (removeCover) finalCover = null;

      /* 2. Create or update showcase */
      const productRes = await fetch('/api/showcases', {
        method: mode === 'edit' ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: initialProduct?.id,
          name: name.trim(),
          description: null,
          action,
          imageUrl: finalCover,
        }),
      });

      if (!productRes.ok) {
        const err = await productRes.json();
        throw new Error(err.error || 'Failed to save showcase');
      }

      const productData = await productRes.json();
      const showcaseId = mode === 'edit' ? initialProduct!.id : productData.id;

      /* 3. Save blocks */
      const blocksPayload = blocks.map((b, i) => ({
        id: b.tempId.startsWith('temp_') ? undefined : b.tempId,
        type: b.type,
        content: b.content || null,
        mediaUrl: b.mediaUrl || null,
        caption: b.caption || null,
        order: i,
        metadata: b.metadata || null,
      }));

      const blocksRes = await fetch('/api/showcase-blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showcaseId, blocks: blocksPayload }),
      });

      if (!blocksRes.ok) {
        throw new Error('Failed to save content blocks');
      }

      toast.success(mode === 'edit' ? 'Showcase updated' : 'Showcase created');
      router.push('/admin/showcase');
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsSaving(false);
    }
  };

  /* ---- Preview mode ---- */
  if (showPreview) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
          <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setShowPreview(false)}
              className="gap-2"
            >
              <ArrowLeft size={16} />
              Back to editor
            </Button>
            <span className="text-sm text-muted-foreground">Preview</span>
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-4 py-10">
          <PreviewContent
            name={name}
            coverUrl={coverPreview}
            blocks={blocks}
          />
        </div>
      </div>
    );
  }

  /* ---- Editor mode ---- */
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            {mode === 'edit' ? 'Edit Showcase' : 'New Showcase'}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              className="gap-2"
            >
              <Eye size={16} />
              Preview
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving && <Loader2 size={16} className="mr-2 animate-spin" />}
              {mode === 'edit' ? 'Update' : 'Save'}
            </Button>
          </div>
        </div>

        {/* Cover + Title */}
        <Card className="p-5 border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Cover image */}
            <div className="w-full sm:w-64 shrink-0">
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleCoverFile(f);
                }}
              />
              {coverPreview ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                  <img
                    src={coverPreview}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleCoverFile(null)}
                    className="absolute top-2 right-2 p-1 rounded-lg bg-black/60 text-white/70 hover:text-red-400 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => coverInputRef.current?.click()}
                  className="w-full aspect-video rounded-xl border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:border-white/40 hover:text-white/60 transition"
                >
                  <Upload size={20} />
                  <span className="text-xs">Cover image</span>
                </button>
              )}
            </div>

            {/* Title + Status */}
            <div className="flex-1 flex flex-col gap-3">
              <Input
                placeholder="Showcase title"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg font-medium bg-transparent border-white/10"
              />
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Status</span>
                <Select
                  value={action}
                  onValueChange={(v) => setAction(v as ShowcaseAction)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publish">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Blocks */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Content blocks
          </span>

          {!blocksLoaded && (
            <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
              <Loader2 size={16} className="mr-2 animate-spin" />
              Loading blocks...
            </div>
          )}

          {blocksLoaded && blocks.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-3">
                No content blocks yet
              </p>
              <Button
                variant="outline"
                onClick={() => addBlock('paragraph')}
                className="gap-2"
              >
                <Plus size={16} />
                Add your first block
              </Button>
            </div>
          )}

          {blocks.map((block, index) => (
            <BlockCard
              key={block.tempId}
              block={block}
              index={index}
              total={blocks.length}
              onUpdate={(patch) => updateBlock(block.tempId, patch)}
              onRemove={() => removeBlock(block.tempId)}
              onMove={(dir) => moveBlock(block.tempId, dir)}
              onAddAfter={(type) => addBlock(type, block.tempId)}
            />
          ))}

          {/* Add block button at bottom */}
          {blocks.length > 0 && (
            <div className="relative flex justify-center pt-2">
              <AddBlockMenu
                onAdd={(type) => addBlock(type)}
                open={addMenuOpen === 'bottom'}
                onToggle={() =>
                  setAddMenuOpen(addMenuOpen === 'bottom' ? null : 'bottom')
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Add Block Menu                                                     */
/* ------------------------------------------------------------------ */

const BLOCK_TYPES: BlockType[] = [
  'paragraph',
  'heading',
  'subheading',
  'image',
  'video',
  'link',
  'quote',
  'gallery',
];

function AddBlockMenu({
  onAdd,
  open,
  onToggle,
}: {
  onAdd: (type: BlockType) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, onToggle]);

  return (
    <div ref={ref} className="relative inline-block">
      <Button
        variant="outline"
        size="sm"
        onClick={onToggle}
        className="gap-2 border-dashed"
      >
        <Plus size={14} />
        Add block
      </Button>

      {open && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-[#111] border border-white/10 rounded-xl p-2 shadow-2xl min-w-[180px]">
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => onAdd(type)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition"
            >
              {blockTypeIcon(type)}
              {blockTypeLabel(type)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Block Card                                                         */
/* ------------------------------------------------------------------ */

function BlockCard({
  block,
  index,
  total,
  onUpdate,
  onRemove,
  onMove,
  onAddAfter,
}: {
  block: BlockEditorBlock;
  index: number;
  total: number;
  onUpdate: (patch: Partial<Omit<BlockEditorBlock, 'tempId'>>) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  onAddAfter: (type: BlockType) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const handleMediaUpload = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      onUpdate({ mediaUrl: data.url });
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const isMedia = block.type === 'image' || block.type === 'video';

  return (
    <div className="group relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden hover:border-white/20 transition">
      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-white/5">
        <GripVertical size={14} className="text-white/20" />

        <span className="text-xs font-medium text-white/50 flex items-center gap-1.5">
          {blockTypeIcon(block.type)}
          {blockTypeLabel(block.type)}
        </span>

        <div className="ml-auto flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white/30 hover:text-white/70"
            disabled={index === 0}
            onClick={() => onMove(-1)}
          >
            <ChevronUp size={12} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white/30 hover:text-white/70"
            disabled={index === total - 1}
            onClick={() => onMove(1)}
          >
            <ChevronDown size={12} />
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white/30 hover:text-white/70"
              onClick={() => setAddOpen(!addOpen)}
            >
              <Plus size={12} />
            </Button>
            {addOpen && (
              <div className="absolute top-full right-0 mt-1 z-50 bg-[#111] border border-white/10 rounded-xl p-1.5 shadow-2xl min-w-[150px]">
                {BLOCK_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      onAddAfter(type);
                      setAddOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition"
                  >
                    {blockTypeIcon(type)}
                    {blockTypeLabel(type)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-white/30 hover:text-red-400"
            onClick={onRemove}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Text-based blocks */}
        {(block.type === 'paragraph' || block.type === 'quote') && (
          <Textarea
            placeholder={
              block.type === 'paragraph'
                ? 'Write your paragraph...'
                : 'Write a quote...'
            }
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className={cn(
              'min-h-[80px] bg-transparent border-white/10 resize-none',
              block.type === 'quote' &&
                'pl-4 border-l-2 border-orange-500/50 italic text-white/80',
            )}
          />
        )}

        {/* Heading */}
        {block.type === 'heading' && (
          <Input
            placeholder="Heading text"
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="text-xl font-bold bg-transparent border-white/10"
          />
        )}

        {/* Subheading */}
        {block.type === 'subheading' && (
          <Input
            placeholder="Subheading text"
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="text-base font-semibold bg-transparent border-white/10"
          />
        )}

        {/* Link */}
        {block.type === 'link' && (
          <div className="flex flex-col gap-2">
            <Input
              placeholder="Link text (e.g. View Project)"
              value={block.content}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="bg-transparent border-white/10"
            />
            <Input
              placeholder="https://example.com"
              value={block.mediaUrl ?? ''}
              onChange={(e) => onUpdate({ mediaUrl: e.target.value })}
              className="bg-transparent border-white/10 text-sm text-muted-foreground"
            />
          </div>
        )}

        {/* Image */}
        {block.type === 'image' && (
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleMediaUpload(f);
              }}
            />
            {block.mediaUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-white/10">
                <img
                  src={block.mediaUrl}
                  alt={block.caption || 'Image'}
                  className="w-full max-h-[400px] object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/60 text-white/70 hover:text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={12} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/60 text-white/70 hover:text-red-400"
                    onClick={() => onUpdate({ mediaUrl: null })}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 rounded-lg border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:border-white/40 hover:text-white/60 transition"
              >
                {uploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <ImageIcon size={18} />
                )}
                <span className="text-xs">
                  {uploading ? 'Uploading...' : 'Click to upload image'}
                </span>
              </button>
            )}
            <Input
              placeholder="Image caption (optional)"
              value={block.caption}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              className="bg-transparent border-white/10 text-sm"
            />
          </div>
        )}

        {/* Video */}
        {block.type === 'video' && (
          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleMediaUpload(f);
              }}
            />
            {block.mediaUrl ? (
              <div className="relative rounded-lg overflow-hidden border border-white/10">
                <video
                  src={block.mediaUrl}
                  controls
                  className="w-full max-h-[400px] object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/60 text-white/70 hover:text-white"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={12} />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 bg-black/60 text-white/70 hover:text-red-400"
                    onClick={() => onUpdate({ mediaUrl: null })}
                  >
                    <X size={12} />
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 rounded-lg border border-dashed border-white/20 bg-white/5 flex flex-col items-center justify-center gap-2 text-white/40 hover:border-white/40 hover:text-white/60 transition"
              >
                {uploading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Video size={18} />
                )}
                <span className="text-xs">
                  {uploading ? 'Uploading...' : 'Click to upload video'}
                </span>
              </button>
            )}
            <Input
              placeholder="Video caption (optional)"
              value={block.caption}
              onChange={(e) => onUpdate({ caption: e.target.value })}
              className="bg-transparent border-white/10 text-sm"
            />
          </div>
        )}

        {/* Gallery */}
        {block.type === 'gallery' && (
          <GalleryEditor
            images={(block.metadata?.images as GalleryImage[]) ?? []}
            caption={block.caption}
            onChange={(images) => onUpdate({ metadata: { images } })}
            onCaptionChange={(caption) => onUpdate({ caption })}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview Content                                                    */
/* ------------------------------------------------------------------ */

function PreviewContent({
  name,
  coverUrl,
  blocks,
}: {
  name: string;
  coverUrl: string | null;
  blocks: BlockEditorBlock[];
}) {
  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">
        {name}
      </h1>

      {coverUrl && (
        <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8">
          <img
            src={coverUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-6">
        {blocks.map((block) => (
          <PreviewBlock key={block.tempId} block={block} />
        ))}
      </div>
    </article>
  );
}

function PreviewBlock({ block }: { block: BlockEditorBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="text-base leading-relaxed text-foreground/90">
          {block.content}
        </p>
      );

    case 'heading':
      return (
        <h2 className="text-2xl font-bold tracking-tight mt-4">
          {block.content}
        </h2>
      );

    case 'subheading':
      return (
        <h3 className="text-lg font-semibold tracking-tight mt-2">
          {block.content}
        </h3>
      );

    case 'image':
      return (
        <figure className="flex flex-col gap-2">
          {block.mediaUrl && (
            <img
              src={block.mediaUrl}
              alt={block.caption || ''}
              className="w-full rounded-xl object-cover"
            />
          )}
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'video':
      return (
        <figure className="flex flex-col gap-2">
          {block.mediaUrl && (
            <video
              src={block.mediaUrl}
              controls
              className="w-full rounded-xl"
            />
          )}
          {block.caption && (
            <figcaption className="text-sm text-muted-foreground text-center">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case 'link':
      return (
        <a
          href={block.mediaUrl ?? '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
        >
          {block.content || block.mediaUrl}
          <Link2 size={14} />
        </a>
      );

    case 'quote':
      return (
        <blockquote className="border-l-4 border-orange-500/60 pl-5 py-2 italic text-foreground/80 text-lg">
          {block.content}
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
