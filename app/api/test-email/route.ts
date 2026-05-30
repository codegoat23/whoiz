import { transporter } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function GET() {
  await transporter.sendMail({
    from: `"MyApp" <${process.env.MAILERSEND_SMTP_USER}>`,
    to: "codesmrt@gmail.com",
    subject: "MailerSend test email",
    html: "<p>If you see this, MailerSend SMTP works 🎉</p>",
  });

  return NextResponse.json({ success: true });
}
