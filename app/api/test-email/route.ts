import { NextResponse } from "next/server";

import { transporter } from "@/lib/mailer";
import { getApiSessionUser } from "@/lib/session";

export async function GET() {
  const user = await getApiSessionUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await transporter.sendMail({
    from: `"MyApp" <${process.env.MAILERSEND_SMTP_USER}>`,
    to: "codesmrt@gmail.com",
    subject: "MailerSend test email",
    html: "<p>If you see this, MailerSend SMTP works 🎉</p>",
  });

  return NextResponse.json({ success: true });
}
