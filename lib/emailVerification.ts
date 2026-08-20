import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { generateEmailVerificationToken, hashToken } from "@/lib/tokens";

export async function createEmailVerificationToken(userId: string) {
  // Delete old tokens for this user
  await prisma.emailVerificationToken.deleteMany({
    where: { userId },
  });

  // Generate new plaintext token (returned to caller for the URL)
  const token = generateEmailVerificationToken();

  // Store only the SHA-256 hash in the database
  await prisma.emailVerificationToken.create({
    data: {
      userId,
      token: hashToken(token),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
    },
  });

  return token;
}

export async function sendVerificationEmail(userId: string, email: string) {
  const token = await createEmailVerificationToken(userId);

  const verifyUrl = `${process.env.APP_URL}/verify-email/confirm?token=${token}`;

  const { error } = await resend.emails.send({
    from: "Whoiz <onboarding@whoiz.space>",
    to: email,
    subject: "Verify your email address",
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Welcome to Whoiz!</h2>
        <p>Please verify your email address to get started.</p>
        <p>Click the button below to verify your email:</p>
        <a href="${verifyUrl}"
           style="display:inline-block;padding:12px 24px;background:#FF5E57;color:white;text-decoration:none;border-radius:8px;font-weight:bold;">
          Verify Email
        </a>
        <p style="margin-top:20px;font-size:12px;color:#888;">
          This link expires in 1 hour. If you didn't create an account, you can safely ignore this email.
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send verification email:", error);
    throw new Error("Failed to send verification email");
  }
}
