
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || typeof password !== "string") {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!rateLimit(`reset-password:${ip}`, 10, 15 * 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword: password,
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset password error:", err);

    return NextResponse.json(
      { error: "Reset failed" },
      { status: 500 }
    );
  }
}
