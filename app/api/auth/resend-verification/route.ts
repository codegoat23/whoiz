import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { createEmailVerificationToken } from "@/lib/emailVerification";
import { rateLimit } from "@/lib/rate-limit";
import { resend } from "@/lib/resend";

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
      { ok: false, error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const token = await createEmailVerificationToken(user.id);

    const verifyUrl = `${process.env.APP_URL}/verify-email/confirm?token=${token}`;

    await resend.emails.send({
      from: "MyApp <onboarding@whoiz.space>",
      to: user.email,
      subject: "Verify your email",
      html: `
      <p>Click below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      ok: false,
      error: "Failed to send verification email",
    });
  }
}
