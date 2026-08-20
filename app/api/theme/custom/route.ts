import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(req: Request) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList.entries()),
    });

    if (!session?.user) {
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
        { error: "Only JPG, PNG, and WebP images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Image must be under 5MB" },
        { status: 400 }
      );
    }

    const { url } = await storage.upload(file, {
      folder: "whoiz/custom-themes",
    });

    const previous = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { customBgImageUrl: true },
    });

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        cardTheme: "custom",
        customBgImageUrl: url,
      },
    });

    if (previous?.customBgImageUrl && previous.customBgImageUrl !== url) {
      storage.delete(previous.customBgImageUrl).catch((error) => {
        console.error("[storage] Failed to delete previous theme:", error);
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[storage] Custom theme upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload custom theme" },
      { status: 500 }
    );
  }
}
