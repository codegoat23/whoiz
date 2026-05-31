import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,

    // 🔥 REQUIRED FOR PASSWORD RESET
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Draaft <onboarding@resend.dev>", // change to your verified domain
        to: user.email,
        subject: "Reset your password 🔐",
        html: `
          <div style="font-family: sans-serif; padding: 20px;">
            <h2>Password Reset Request</h2>
            <p>You requested to reset your password.</p>
            <p>Click the button below to continue:</p>
            <a href="${url}" 
               style="display:inline-block;padding:10px 15px;background:#FF5E57;color:white;text-decoration:none;border-radius:8px;">
              Reset Password
            </a>
            <p style="margin-top:20px;font-size:12px;color:#888;">
              If you didn’t request this, ignore this email.
            </p>
          </div>
        `,
      });
    },
  },

  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string",
        required: false,
      },
    },
  },

  plugins: [nextCookies()],
});