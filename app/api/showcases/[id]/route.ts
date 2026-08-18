import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const showcase = await prisma.showcase.findFirst({
    where: {
      id,
      ownerId: userId,
    },
  });

  if (!showcase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.showcase.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
