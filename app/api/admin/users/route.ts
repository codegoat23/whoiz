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
  const status = searchParams.get("status") || "all";
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { username: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { name: { contains: search, mode: "insensitive" } },
    ];
  }

  if (status === "suspended") {
    where.deactivated = true;
  } else if (status === "active") {
    where.deactivated = false;
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
        email: true,
        name: true,
        avatarUrl: true,
        deactivated: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            showcases: true,
            sessions: true,
          },
        },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const userIds = users.map((u) => u.id);
  const viewCounts = await prisma.pageView.groupBy({
    by: ["userId"],
    where: { userId: { in: userIds } },
    _count: { id: true },
  });
  const viewMap = new Map(viewCounts.map((v) => [v.userId, v._count.id]));

  const lastSessions = await prisma.session.findMany({
    where: { userId: { in: userIds } },
    orderBy: { updatedAt: "desc" },
    distinct: ["userId"],
    select: { userId: true, updatedAt: true },
  });
  const lastActiveMap = new Map(
    lastSessions.map((s) => [s.userId, s.updatedAt])
  );

  const enrichedUsers = users.map((u) => ({
    ...u,
    profileViews: viewMap.get(u.id) || 0,
    lastActive: lastActiveMap.get(u.id) || null,
  }));

  return NextResponse.json({
    users: enrichedUsers,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
