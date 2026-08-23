import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminApi } from "@/lib/admin";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const { id } = await params;
  const body = await request.json();

  if (!body.status || !["Reviewed", "Dismissed"].includes(body.status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 }
    );
  }

  const report = await prisma.report.findUnique({ where: { id } });
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const updated = await prisma.report.update({
    where: { id },
    data: {
      status: body.status,
      resolvedAt: new Date(),
    },
  });

  return NextResponse.json(updated);
}
