import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Props = {
  params: {
    username: string;
    productId: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { username, productId } =  await params;

  // 1️⃣ Find user
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) notFound();

  // 2️⃣ Find product belonging to this user
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      ownerId: user.id,
    },
  });

  if (!product) notFound();

  return (
    <main className="max-w-3xl flex flex-col mx-auto p-6 w-full min-h-screen">
      <Link
        href={`/${username}`}
        className="self-start mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to profile
      </Link>

      <Card className="p-6 rounded-4xl flex flex-col gap-5 w-full lg:w-1/2 mx-auto border-none">
        {/* IMAGE */}
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 rounded-xl object-cover border"
          />
        ) : (
          <div className="w-full h-80 rounded-2xl bg-muted flex items-center justify-center text-sm">
            No image available
          </div>
        )}

        {/* INFO */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-extrabold">
            {product.name}
          </h1>

          {product.description && (
         <div
  className="
    text-[12px]

    [&_p]:mb-2

    /* BULLET LIST */
    [&_ul]:list-disc
    [&_ul]:pl-5
    [&_ul]:space-y-1

    /* ORDERED LIST */
    [&_ol]:list-decimal
    [&_ol]:pl-5
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
    [&_a]:font-medium
    hover:[&_a]:opacity-90
  "
  dangerouslySetInnerHTML={{ __html: product.description }}
/>


          )}
        </div>

        
      
      </Card>
    </main>
  );
}
