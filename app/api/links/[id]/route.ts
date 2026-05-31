import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* =========================
   DELETE LINK (secured)
========================= */
export async function DELETE(
  _req: NextRequest,
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

  const link = await prisma.link.findFirst({
    where: {
      id,
      userId,
    },
  });

  if (!link) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.link.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

/* =========================
   UPDATE LINK (secured)
========================= */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json();

    const link = await prisma.link.findFirst({
      where: {
        id,
        userId, // ⚠️ make sure this matches your schema (was ownerId before)
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedLink = await prisma.link.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({
      success: true,
      link: updatedLink,
    });
  } catch (error: any) {
    console.error("UPDATE /api/links error:", error);

    return NextResponse.json(
      {
        error: "Failed to update link",
        details: error.message,
      },
      { status: 500 }
    );
  }
}