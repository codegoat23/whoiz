import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    newUsersThisWeek,
    totalShowcases,
    publishedShowcases,
    draftShowcases,
    totalViews,
    viewsThisWeek,
    activeUsers,
    deactivatedUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: oneWeekAgo } } }),
    prisma.showcase.count(),
    prisma.showcase.count({ where: { action: "Publish" } }),
    prisma.showcase.count({ where: { action: "Draft" } }),
    prisma.pageView.count(),
    prisma.pageView.count({ where: { createdAt: { gte: oneWeekAgo } } }),
    prisma.user.count({
      where: {
        sessions: { some: { updatedAt: { gte: oneMonthAgo } } },
      },
    }),
    prisma.user.count({ where: { deactivated: true } }),
  ]);

  const pendingReports = await prisma.report.count({
    where: { status: "Pending" },
  });

  return NextResponse.json({
    totalUsers,
    newUsersThisWeek,
    totalShowcases,
    publishedShowcases,
    draftShowcases,
    totalViews,
    viewsThisWeek,
    activeUsers,
    deactivatedUsers,
    pendingReports,
  });
}
