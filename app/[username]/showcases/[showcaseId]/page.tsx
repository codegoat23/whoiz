import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ShowcaseBlockRenderer from '@/components/showcase/ShowcaseBlockRenderer';

type Props = {
  params: {
    username: string;
    showcaseId: string;
  };
};

export default async function ShowcasePage({ params }: Props) {
  const { username, showcaseId } = await params;

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
    },
  });

  if (!user) notFound();

  const showcase = await prisma.showcase.findFirst({
    where: {
      id: showcaseId,
      ownerId: user.id,
    },
    include: {
      blocks: { orderBy: { order: 'asc' } },
    },
  });

  if (!showcase) notFound();

  const hasBlocks = showcase.blocks && showcase.blocks.length > 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Sticky back bar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href={`/${username}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to profile
          </Link>

          <div className="flex items-center gap-2">
            <img
              src={user.avatarUrl || '/profile.jpg'}
              alt={user.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-muted-foreground">{user.name}</span>
          </div>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-6">
          {showcase.name}
        </h1>

        {/* Cover image */}
        {showcase.imageUrl && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden mb-10">
            <img
              src={showcase.imageUrl}
              alt={showcase.name}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Blocks content */}
        {hasBlocks ? (
          <ShowcaseBlockRenderer blocks={showcase.blocks} />
        ) : showcase.description ? (
          /* Legacy description fallback */
          <div
            className="
              text-base leading-[1.8] text-foreground/85
              [&_p]:mb-3
              [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1
              [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1
              [&_li]:ml-1
              [&_a]:inline-flex [&_a]:items-center [&_a]:gap-2
              [&_a]:px-3 [&_a]:py-1.5 [&_a]:rounded-md
              [&_a]:bg-primary [&_a]:text-primary-foreground
              [&_a]:no-underline [&_a]:font-medium
              hover:[&_a]:opacity-90
            "
            dangerouslySetInnerHTML={{ __html: showcase.description }}
          />
        ) : (
          <p className="text-muted-foreground text-sm italic">
            No content yet.
          </p>
        )}
      </article>
    </main>
  );
}
