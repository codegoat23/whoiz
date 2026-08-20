import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateOtp, hashToken } from "@/lib/tokens";

export async function createEmailVerificationOtp(userId: string) {
  // Delete old OTPs for this user
  await prisma.emailVerificationToken.deleteMany({
    where: { userId },
  });

  // Generate 6-digit OTP
  const otp = generateOtp();

  // Store only the hash
  await prisma.emailVerificationToken.create({
    data: {
      userId,
      token: hashToken(otp),
      expiresAt: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes
    },
  });

  return otp;
}

export async function sendVerificationEmail(userId: string, email: string) {
  const otp = await createEmailVerificationOtp(userId);

  const { error } = await resend.emails.send({
    from: "Whoiz <onboarding@whoiz.space>",
    to: email,
    subject: "Your verification code",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Verify your email</h2>
        <p>Use the following code to verify your email address:</p>
        <div style="font-size:32px;font-weight:bold;letter-spacing:8px;padding:20px;background:#f5f5f5;border-radius:8px;text-align:center;margin:20px 0;">
          ${otp}
        </div>
        <p style="font-size:12px;color:#888;">This code expires in 15 minutes. If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
