import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  // 1️⃣ Get session from headers
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  // 2️⃣ Read form data
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  // 3️⃣ Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // 4️⃣ Upload to Cloudinary
  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder: "whoiz/profiles",
        transformation: [
          { width: 400, height: 400, crop: "fill", gravity: "face" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  // 5️⃣ Save image URL to database
  await prisma.user.update({
    where: { id: userId },
    data: {
      avatarUrl: uploadResult.secure_url,
    },
  });

  // 6️⃣ Return image URL to frontend
  return NextResponse.json({
    avatarUrl: uploadResult.secure_url,
  });
}
