
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (typeof email !== "string" || !email.trim()) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(`forgot-password:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.APP_URL}/reset-password`,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Password reset error:", err);

    return NextResponse.json(
      { error: "Failed to send reset email" },
      { status: 500 }
    );
  }
}
