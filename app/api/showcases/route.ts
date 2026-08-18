import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { storage } from "@/lib/storage";

const FREE_SHOWCASE_LIMIT = 2;

/* ======================================================
   GET /api/showcases
   ====================================================== */
export async function GET() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const showcases = await prisma.showcase.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "asc" },
    include: { blocks: { orderBy: { order: "asc" } } },
  });

  return NextResponse.json(showcases);
}

/* ======================================================
   POST /api/showcases  (create)
   ====================================================== */
export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await req.json();
    const { name, description, imageUrl, action } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Showcase name is required" },
        { status: 400 }
      );
    }

    const showcase = await prisma.showcase.create({
      data: {
        name,
        description,
        imageUrl,
        action: action ?? "Draft",
        ownerId: userId,
      },
    });

    return NextResponse.json(showcase, { status: 201 });
  } catch (error) {
    console.error("POST /api/showcases error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/* ======================================================
   PUT /api/showcases  (update)
   ====================================================== */
export async function PUT(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, name, description, imageUrl, action } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing showcase ID" },
        { status: 400 }
      );
    }

    const showcase = await prisma.showcase.findFirst({
      where: {
        id,
        ownerId: session.user.id,
      },
    });

    if (!showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    const data: {
      name?: string;
      description?: string | null;
      imageUrl?: string | null;
      action?: "Publish" | "Draft";
    } = {};

    if (typeof name === "string") data.name = name;
    if (typeof description === "string" || description === null) {
      data.description = description;
    }
    if (typeof imageUrl === "string" || imageUrl === null) {
      data.imageUrl = imageUrl;
    }
    if (action === "Publish" || action === "Draft") data.action = action;

    const updatedShowcase = await prisma.showcase.update({
      where: { id },
      data,
    });

    if (showcase.imageUrl && showcase.imageUrl !== updatedShowcase.imageUrl) {
      const stillInUse = await prisma.showcase.findFirst({
        where: {
          imageUrl: showcase.imageUrl,
          id: { not: id },
        },
        select: { id: true },
      });

      if (!stillInUse) {
        try {
          await storage.delete(showcase.imageUrl);
        } catch (error) {
          console.error(
            "[storage] Failed to delete old showcase image:",
            error
          );
        }
      }
    }

    return NextResponse.json(
      { success: true, showcase: updatedShowcase },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/showcases error:", error);
    return NextResponse.json(
      {
        error: "Failed to update showcase",
      },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE /api/showcases
   ====================================================== */
export async function DELETE(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing showcase ID" },
        { status: 400 }
      );
    }

    const showcase = await prisma.showcase.findFirst({
      where: {
        id,
        ownerId: session.user.id,
      },
    });

    if (!showcase) {
      return NextResponse.json(
        { error: "Showcase not found" },
        { status: 404 }
      );
    }

    const blocks = await prisma.showcaseBlock.findMany({
      where: { showcaseId: id },
      select: { mediaUrl: true },
    });

    for (const block of blocks) {
      if (block.mediaUrl) {
        try {
          await storage.delete(block.mediaUrl);
        } catch (err) {
          console.error("[storage] Failed to delete block media:", err);
        }
      }
    }

    await prisma.showcase.delete({
      where: { id },
    });

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/showcases error:", error);
    return NextResponse.json(
      { error: "Failed to delete showcase" },
      { status: 500 }
    );
  }
}
