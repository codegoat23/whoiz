import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hashToken } from "@/lib/tokens";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;

  if (user.emailVerified) {
    return NextResponse.json({ ok: true, message: "Already verified" });
  }

  const { otp } = await req.json();

  if (!otp || typeof otp !== "string" || otp.length !== 6) {
    return NextResponse.json(
      { error: "Invalid code format" },
      { status: 400 }
    );
  }

  if (!rateLimit(`verify-otp:${user.id}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please wait a minute." },
      { status: 429 }
    );
  }

  const hashedOtp = hashToken(otp);

  const record = await prisma.emailVerificationToken.findFirst({
    where: {
      userId: user.id,
      token: hashedOtp,
    },
  });

  if (!record) {
    return NextResponse.json(
      { error: "Invalid code" },
      { status: 400 }
    );
  }

  if (record.expiresAt < new Date()) {
    await prisma.emailVerificationToken.delete({
      where: { id: record.id },
    });
    return NextResponse.json(
      { error: "Code expired. Please request a new one." },
      { status: 400 }
    );
  }

  // Mark user as verified
  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true },
  });

  // Delete the used token
  await prisma.emailVerificationToken.delete({
    where: { id: record.id },
  });

  return NextResponse.json({ ok: true });
}
