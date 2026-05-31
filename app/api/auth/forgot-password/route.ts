import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email required" },
      { status: 400 }
    );
  }

  try {
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
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