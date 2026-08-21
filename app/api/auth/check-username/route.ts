import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const USERNAME_REGEX = /^[a-z0-9_-]+$/;

function normalizeUsername(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9_-]/g, "");
}

export async function POST(req: Request) {
  try {
    const { username: raw } = await req.json();

    if (!raw || typeof raw !== "string") {
      return NextResponse.json(
        { available: false, error: "Username is required" },
        { status: 400 }
      );
    }

    const username = normalizeUsername(raw);

    if (username.length < 3) {
      return NextResponse.json(
        { available: false, error: "Username must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (username.length > 20) {
      return NextResponse.json(
        { available: false, error: "Username must be at most 20 characters" },
        { status: 400 }
      );
    }

    if (!USERNAME_REGEX.test(username)) {
      return NextResponse.json(
        {
          available: false,
          error: "Only letters, numbers, dashes and underscores allowed",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (existing) {
      return NextResponse.json(
        { available: false, error: "Username is already taken" },
        { status: 200 }
      );
    }

    return NextResponse.json({ available: true, username });
  } catch {
    return NextResponse.json(
      { available: false, error: "Server error" },
      { status: 500 }
    );
  }
}
