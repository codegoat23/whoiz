import { NextResponse } from "next/server";

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
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const { url } = await storage.upload(file, { folder: "products" });

    return NextResponse.json({ url });
  } catch (error) {
    console.error("[storage] Showcase image upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
