import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const search = searchParams.get("search") || "";
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        name: true,
        avatarUrl: true,
        deactivated: true,
        createdAt: true,
        _count: {
          select: {
            showcases: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const userIds = users.map((u) => u.id);

  const [showcaseStatuses, viewCounts] = await Promise.all([
    prisma.showcase.groupBy({
      by: ["ownerId", "action"],
      where: { ownerId: { in: userIds } },
      _count: { id: true },
    }),
    prisma.pageView.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: { id: true },
    }),
  ]);

  const viewMap = new Map(viewCounts.map((v) => [v.userId, v._count.id]));
  const publishedMap = new Map<string, number>();
  const draftMap = new Map<string, number>();

  for (const s of showcaseStatuses) {
    if (s.action === "Publish") {
      publishedMap.set(s.ownerId, (publishedMap.get(s.ownerId) || 0) + s._count.id);
    } else {
      draftMap.set(s.ownerId, (draftMap.get(s.ownerId) || 0) + s._count.id);
    }
  }

  const enriched = users.map((u) => ({
    ...u,
    publishedShowcases: publishedMap.get(u.id) || 0,
    draftShowcases: draftMap.get(u.id) || 0,
    profileViews: viewMap.get(u.id) || 0,
  }));

  return NextResponse.json({
    profiles: enriched,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
