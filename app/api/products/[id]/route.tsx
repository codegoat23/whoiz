import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id;

  // Ensure user owns the product
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      ownerId: userId,
    },
  });

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ success: true });
}
