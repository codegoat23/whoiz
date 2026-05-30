
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * GET → fetch all socials for a user
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId" },
        { status: 400 }
      );
    }

    const socials = await prisma.socialConnect.findMany({
      where: { userId },
    });

    return NextResponse.json({ socials });
  } catch (err) {
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
    const body = await req.json();

    const { userId, platform, url } = body;

    if (!userId || !platform || !url) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.socialConnect.findUnique({
      where: {
        userId_platform: {
          userId,
          platform,
        },
      },
    });

    let result;

    if (existing) {
      result = await prisma.socialConnect.update({
        where: { id: existing.id },
        data: { url },
      });
    } else {
      result = await prisma.socialConnect.create({
        data: {
          userId,
          platform,
          url,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to save social link" },
      { status: 500 }
    );
  }
}
