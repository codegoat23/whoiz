
export type ShowcaseAction = 'Publish' | 'Draft';

export type BlockType = 'paragraph' | 'heading' | 'subheading' | 'image' | 'video' | 'link' | 'quote' | 'gallery';

export interface GalleryImage {
  url: string;
  id: string;
}

export interface ShowcaseBlock {
  id: string;
  showcaseId: string;
  type: BlockType;
  content: string | null;
  mediaUrl: string | null;
  caption: string | null;
  order: number;
  metadata: unknown;
  createdAt: Date;
}

export interface Showcase {
    id: string
    name: string
    description: string | null
    action: ShowcaseAction;
    imageUrl: string | null | undefined;
    blocks?: ShowcaseBlock[];
}
