import { NextResponse } from "next/server";
import { detectPlatform } from "@/lib/detectPlatform";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// GET /api/links -> list links for current user
export async function GET() {
  // ⬇️ get headers as plain object
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  const links = await prisma.link.findMany({
    where: { userId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(links);
}

// POST /api/links -> create new link
export async function POST(req: Request) {
  try {
    // ⬇️ same here: get session from headers
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await req.json();
    const { label, url, visible } = body;

    if (!label || !url) {
      return NextResponse.json(
        { error: "label and url are required" },
        { status: 400 }
      );
    }

    const platform = detectPlatform(url);

    const link = await prisma.link.create({
      data: {
        label,
        url,
        platform,
        visible: visible ?? true,
        userId,
      },
    });

    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error("POST /api/links error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
