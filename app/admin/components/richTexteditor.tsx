'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Link2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const [linkUrl, setLinkUrl] = useState('');

  const editor = useEditor({
    immediatelyRender: false, // ✅ SSR safe
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const iconBtn = (active?: boolean) =>
    `h-8 w-8 p-0 ${
      active ? 'bg-primary text-primary-foreground' : ''
    }`;

  return (
    <div className="border rounded-xl p-3 bg-background space-y-2">
      {/* TOOLBAR */}
      <div className="flex flex-wrap gap-1">
        <Button
          variant="outline"
          size="icon"
          className={iconBtn(editor.isActive('bold'))}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={iconBtn(editor.isActive('italic'))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={iconBtn(editor.isActive('underline'))}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <UnderlineIcon size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={iconBtn(editor.isActive('bulletList'))}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={16} />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={iconBtn(editor.isActive('orderedList'))}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={16} />
        </Button>

        {/* LINK POPOVER */}
     
      </div>

      {/* EDITOR */}
  <EditorContent
  editor={editor}
  className="
    min-h-[120px]

    /* TEXT */
    [&_p]:mb-2

    /* BULLET LIST */
    [&_ul]:list-disc
    [&_ul]:pl-6
    [&_ul]:space-y-1

    /* ORDERED LIST */
    [&_ol]:list-decimal
    [&_ol]:pl-6
    [&_ol]:space-y-1

    /* LIST ITEMS */
    [&_li]:ml-1

    /* LINKS AS BUTTONS */
    [&_a]:inline-flex
    [&_a]:items-center
    [&_a]:gap-2
    [&_a]:px-3
    [&_a]:py-1.5
    [&_a]:rounded-md
    [&_a]:bg-primary
    [&_a]:text-primary-foreground
    [&_a]:no-underline
    hover:[&_a]:opacity-90
  "
/>


    </div>
  );
}
