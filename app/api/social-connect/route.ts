
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

/**
 * GET → fetch all socials for the authenticated user
 */
export async function GET() {
  try {
    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const socials = await prisma.socialConnect.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json({ socials });
  } catch (err) {
    console.error("GET /api/social-connect error:", err);
    return NextResponse.json(
      { error: "Failed to fetch socials" },
      { status: 500 }
    );
  }
}

/**
 * POST → create or update social link
 */
export async function POST(req: Request) {
  try {
    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { platform, url } = body;

    if (typeof platform !== "string" || typeof url !== "string") {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    if (!platform.trim() || !url.trim()) {
      return NextResponse.json(
        { error: "Platform and URL are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.socialConnect.findUnique({
      where: {
        userId_platform: {
          userId: user.id,
          platform,
        },
      },
    });

    const result = existing
      ? await prisma.socialConnect.update({
          where: {
            id: existing.id,
          },
          data: {
            url,
          },
        })
      : await prisma.socialConnect.create({
          data: {
            userId: user.id,
            platform,
            url,
          },
        });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    console.error("POST /api/social-connect error:", err);
    return NextResponse.json(
      { error: "Failed to save social link" },
      { status: 500 }
    );
  }
}

/**
 * DELETE → remove a social link by platform key
 */
export async function DELETE(req: Request) {
  try {
    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { platform } = await req.json();

    if (typeof platform !== "string" || !platform.trim()) {
      return NextResponse.json(
        { error: "Platform is required" },
        { status: 400 }
      );
    }

    const existing = await prisma.socialConnect.findUnique({
      where: {
        userId_platform: {
          userId: user.id,
          platform,
        },
      },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Social link not found" },
        { status: 404 }
      );
    }

    await prisma.socialConnect.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/social-connect error:", err);
    return NextResponse.json(
      { error: "Failed to delete social link" },
      { status: 500 }
    );
  }
}
