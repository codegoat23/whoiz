import { NextResponse, NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

/* =========================
   DELETE LINK (secured)
========================= */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await getApiSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const link = await prisma.link.findFirst({
    where: {
      id,
      userId: user.id,
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

    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const link = await prisma.link.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!link) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const { label, url, visible, platform } = body;

    const data: {
      label?: string;
      url?: string;
      visible?: boolean;
      platform?: string | null;
    } = {};

    if (typeof label === "string") data.label = label;
    if (typeof url === "string") data.url = url;
    if (typeof visible === "boolean") data.visible = visible;
    if (platform === null || typeof platform === "string") {
      data.platform = platform;
    }

    const updatedLink = await prisma.link.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      link: updatedLink,
    });
  } catch (error) {
    console.error("UPDATE /api/links error:", error);

    return NextResponse.json(
      {
        error: "Failed to update link",
      },
      { status: 500 }
    );
  }
}
