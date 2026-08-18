import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

async function getSession() {
  const headersList = await headers();
  return auth.api.getSession({ headers: Object.fromEntries(headersList) });
}

/* ======================================================
   GET /api/showcase-blocks?showcaseId=xxx
   ====================================================== */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const showcaseId = searchParams.get("showcaseId");

  if (!showcaseId) {
    return NextResponse.json({ error: "Missing showcaseId" }, { status: 400 });
  }

  const showcase = await prisma.showcase.findFirst({
    where: { id: showcaseId, ownerId: session.user.id },
    select: { id: true },
  });

  if (!showcase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const blocks = await prisma.showcaseBlock.findMany({
    where: { showcaseId },
    orderBy: { order: "asc" },
  });

  return NextResponse.json(blocks);
}

/* ======================================================
   POST /api/showcase-blocks  (bulk save – replaces all blocks)
   ====================================================== */
export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { showcaseId, blocks } = body as {
      showcaseId: string;
      blocks: {
        id?: string;
        type: string;
        content?: string | null;
        mediaUrl?: string | null;
        caption?: string | null;
        order: number;
        metadata?: unknown;
      }[];
    };

    if (!showcaseId) {
      return NextResponse.json({ error: "Missing showcaseId" }, { status: 400 });
    }

    const showcase = await prisma.showcase.findFirst({
      where: { id: showcaseId, ownerId: session.user.id },
      select: { id: true },
    });

    if (!showcase) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete existing blocks and recreate
    await prisma.showcaseBlock.deleteMany({ where: { showcaseId } });

    if (blocks && blocks.length > 0) {
      await prisma.showcaseBlock.createMany({
        data: blocks.map((b) => ({
          showcaseId,
          type: b.type as any,
          content: b.content ?? null,
          mediaUrl: b.mediaUrl ?? null,
          caption: b.caption ?? null,
          order: b.order,
          metadata: b.metadata ?? undefined,
        })),
      });
    }

    const saved = await prisma.showcaseBlock.findMany({
      where: { showcaseId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(saved, { status: 200 });
  } catch (error) {
    console.error("POST /api/showcase-blocks error:", error);
    return NextResponse.json({ error: "Failed to save blocks" }, { status: 500 });
  }
}

/* ======================================================
   DELETE /api/showcase-blocks  (delete a single block)
   ====================================================== */
export async function DELETE(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing block id" }, { status: 400 });
    }

    const block = await prisma.showcaseBlock.findUnique({ where: { id } });
    if (!block) {
      return NextResponse.json({ error: "Block not found" }, { status: 404 });
    }

    const showcase = await prisma.showcase.findFirst({
      where: { id: block.showcaseId, ownerId: session.user.id },
      select: { id: true },
    });

    if (!showcase) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.showcaseBlock.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/showcase-blocks error:", error);
    return NextResponse.json({ error: "Failed to delete block" }, { status: 500 });
  }
}
