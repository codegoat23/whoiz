// lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // ✅ must match your Prisma datasource
  }),

  // ✅ Enable email/password auth
  emailAndPassword: {
    enabled: true,
  },

  // ✅ Tell BetterAuth that "user" has extra fields: username & bio
  user: {
    additionalFields: {
      username: {
        type: "string",
        required: false,   // kuna users bado hawaja-set username wakati wa signup
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
