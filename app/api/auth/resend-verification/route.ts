import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { sendVerificationEmail } from "@/lib/emailVerification";
import { rateLimit } from "@/lib/rate-limit";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ ok: true });
  }

  const user = session.user;

  if (user.emailVerified) {
    return NextResponse.json({ ok: true });
  }

  if (!rateLimit(`resend-verification:${user.id}`, 3, 60_000)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please wait a minute." },
      { status: 429 }
    );
  }

  try {
    await sendVerificationEmail(user.id, user.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send verification email" },
      { status: 500 }
    );
  }
}
