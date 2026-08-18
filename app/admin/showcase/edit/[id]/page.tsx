import { prisma } from '@/lib/prisma';
import { ShowcaseAction } from '@/lib/type';
import BlockEditor from '../../block-editor/BlockEditor';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditShowcasePage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return <div className="p-4">Invalid showcase ID</div>;
  }

  const showcase = await prisma.showcase.findUnique({
    where: { id },
    include: { blocks: { orderBy: { order: 'asc' } } },
  });

  if (!showcase) {
    return <div className="p-4">Showcase not found</div>;
  }

  const normalizedShowcase = {
    ...showcase,
    action: (showcase.action ?? 'Publish') as ShowcaseAction,
  };

  return (
    <BlockEditor
      mode="edit"
      imageUrl={normalizedShowcase.imageUrl}
      initialProduct={normalizedShowcase as any}
    />
  );
}
