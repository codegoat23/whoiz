import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const days = Math.min(90, Math.max(7, parseInt(searchParams.get("days") || "30")));

  const now = new Date();
  const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  const [userSignups, profileViews, showcaseCreations] = await Promise.all([
    prisma.user.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.pageView.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.showcase.findMany({
      where: { createdAt: { gte: startDate } },
      select: { createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  function aggregateByDay(
    items: { createdAt: Date }[],
    start: Date,
    numDays: number
  ) {
    const map = new Map<string, number>();
    for (let i = 0; i < numDays; i++) {
      const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      map.set(key, 0);
    }
    for (const item of items) {
      const key = item.createdAt.toISOString().split("T")[0];
      if (map.has(key)) {
        map.set(key, (map.get(key) || 0) + 1);
      }
    }
    return Array.from(map.entries()).map(([date, count]) => ({ date, count }));
  }

  const userGrowth = aggregateByDay(userSignups, startDate, days);
  const viewActivity = aggregateByDay(profileViews, startDate, days);
  const showcaseGrowth = aggregateByDay(showcaseCreations, startDate, days);

  const totalUsers = await prisma.user.count();
  const totalViews = await prisma.pageView.count();
  const totalShowcases = await prisma.showcase.count();
  const totalSessions = await prisma.session.count();

  return NextResponse.json({
    userGrowth,
    viewActivity,
    showcaseGrowth,
    totals: { totalUsers, totalViews, totalShowcases, totalSessions },
  });
}
