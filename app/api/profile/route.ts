import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

export async function PUT(req: Request) {
  try {
    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, bio, story } = body;

    const data: { name?: string; bio?: string; story?: string } = {};

    if (typeof name === "string") data.name = name;
    if (typeof bio === "string") data.bio = bio;
    if (typeof story === "string") data.story = story;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
      select: { id: true, name: true, bio: true, story: true },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("UPDATE /api/profile error:", error);
    return NextResponse.json(
      { error: "Failed to update user profile" },
      { status: 500 }
    );
  }
}
