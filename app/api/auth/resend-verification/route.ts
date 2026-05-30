import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { createEmailVerificationToken } from "@/lib/emailVerification";
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

  const token = await createEmailVerificationToken(user.id);

  const verifyUrl = `${process.env.APP_URL}/verify-email/confirm?token=${token}`;

  // DEV MODE
 try {
  const data = await resend.emails.send({
    from: "MyApp <onboarding@resend.dev>",
    to: user.email,
    subject: "Verify your email",
    html: `
      <p>Click below:</p>
      <a href="${verifyUrl}">${verifyUrl}</a>
    `,
  });

  console.log(data);

  return NextResponse.json({ ok: true });
} catch (error) {
  console.error(error);

  return NextResponse.json({
    ok: false,
    error,
  });
} 9

  // RESEND EMAIL
   
}