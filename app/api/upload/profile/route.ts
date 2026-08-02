import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";
import { storage } from "@/lib/storage";

export async function POST(req: Request) {
  const user = await getApiSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  try {
    const { url } = await storage.upload(file, {
      folder: "whoiz/profiles",
      transformation: {
        width: 400,
        height: 400,
        crop: "fill",
        gravity: "face",
      },
    });

    const previous = await prisma.user.findUnique({
      where: { id: user.id },
      select: { avatarUrl: true },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { avatarUrl: url },
    });

    if (previous?.avatarUrl && previous.avatarUrl !== url) {
      storage.delete(previous.avatarUrl).catch((error) => {
        console.error("[storage] Failed to delete previous avatar:", error);
      });
    }

    return NextResponse.json({ avatarUrl: url });
  } catch (error) {
    console.error("[storage] Profile image upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload profile image" },
      { status: 500 }
    );
  }
}
