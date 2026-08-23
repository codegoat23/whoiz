import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function GET(request: NextRequest) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "20")));
  const status = searchParams.get("status") || "all";
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (status !== "all") {
    where.status = status;
  }

  const [reports, total] = await Promise.all([
    prisma.report.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    }),
    prisma.report.count({ where }),
  ]);

  return NextResponse.json({
    reports,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const session = await (await import("@/lib/auth")).auth.api.getSession({
    headers: await (await import("next/headers")).headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (
    !body.targetType ||
    !body.targetId ||
    !body.reason ||
    typeof body.reason !== "string" ||
    body.reason.trim().length < 3
  ) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!["user", "showcase"].includes(body.targetType)) {
    return NextResponse.json(
      { error: "Invalid target type" },
      { status: 400 }
    );
  }

  const report = await prisma.report.create({
    data: {
      targetType: body.targetType,
      targetId: body.targetId,
      reason: body.reason.trim(),
      reporterId: session.user.id,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
