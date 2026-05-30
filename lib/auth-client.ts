// lib/auth-client.ts
"use client";

import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// If frontend and backend are same domain, baseURL can be omitted.
// You can add baseURL: process.env.NEXT_PUBLIC_APP_URL if you want.
export const authClient = createAuthClient({
    
  baseURL: process.env.BETTER_AUTH_URL, // or leave out if same origin
});

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = authClient;