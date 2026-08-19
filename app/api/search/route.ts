import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim();

    if (!q || q.length < 1) {
      return NextResponse.json({ results: [] });
    }

    const userId = session.user.id;

    const [showcases, links] = await Promise.all([
      prisma.showcase.findMany({
        where: {
          ownerId: userId,
          name: { contains: q, mode: "insensitive" },
        },
        select: { id: true, name: true, description: true, imageUrl: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.link.findMany({
        where: {
          userId,
          OR: [
            { label: { contains: q, mode: "insensitive" } },
            { url: { contains: q, mode: "insensitive" } },
          ],
        },
        select: { id: true, label: true, url: true, platform: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
    ]);

    const results = [
      ...showcases.map((s) => ({
        id: s.id,
        type: "showcase" as const,
        title: s.name,
        description: s.description || "No description",
        href: `/admin/showcase/edit/${s.id}`,
      })),
      ...links.map((l) => ({
        id: l.id,
        type: "link" as const,
        title: l.label,
        description: l.url,
        href: "/admin/links",
      })),
    ];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("GET /api/search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
