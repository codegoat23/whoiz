import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      name: true,
      bio: true,
      avatarUrl: true,
      deactivated: true,
      emailVerified: true,
      cardTheme: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          showcases: true,
          links: true,
          socialConnects: true,
          sessions: true,
        },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const viewCount = await prisma.pageView.count({
    where: { userId: id },
  });

  const lastSession = await prisma.session.findFirst({
    where: { userId: id },
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  return NextResponse.json({
    ...user,
    profileViews: viewCount,
    lastActive: lastSession?.updatedAt || null,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();

  if (typeof body.deactivated !== "boolean") {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { deactivated: body.deactivated },
    select: { id: true, deactivated: true },
  });

  if (body.deactivated) {
    await prisma.session.deleteMany({ where: { userId: id } });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
