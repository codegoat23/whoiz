import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {prisma} from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    console.log("➡️ Custom theme upload started");

    const headersList = await headers();
    console.log("✅ Headers read");

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList.entries()),
    });

    console.log("✅ Session:", session?.user?.id);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    console.log("✅ FormData read");

    const file = formData.get("file") as File | null;
    console.log("📁 File:", file?.name, file?.type);

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("✅ Buffer created");

    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "whoiz/custom-themes" },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary error:", error);
            reject(error);
          }
          resolve(result);
        }
      ).end(buffer);
    });

    console.log("☁️ Uploaded:", uploadResult?.secure_url);

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        cardTheme: "custom",
        customBgImageUrl: uploadResult.secure_url,
      },
    });

    console.log("✅ DB updated");

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("🔥 CUSTOM THEME ERROR:", err);
    return NextResponse.json(
      { error: "Failed to upload custom theme" },
      { status: 500 }
    );
  }
}
