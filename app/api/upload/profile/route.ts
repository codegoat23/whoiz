import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";
import { storage } from "@/lib/storage";

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const user = await getApiSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  const file = formData.get("file") as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, and GIF images are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "Image must be under 2MB" },
      { status: 400 }
    );
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
