import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { storage } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList.entries()),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
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
