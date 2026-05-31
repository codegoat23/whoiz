import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
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