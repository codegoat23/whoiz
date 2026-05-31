import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* =========================
   DELETE LINK (secured)
========================= */
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
  const { id } = await params;

  // check ownership
  const link = await prisma.link.findFirst({
    where: {
      id,
      userId: userId,
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
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { id } = params;

    const body = await _req.json();

    // check ownership before update
    const link = await prisma.link.findFirst({
      where: {
        id,
        ownerId: userId,
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const updatedLink = await prisma.link.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(
      { success: true, link: updatedLink },
      { status: 200 }
    );
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