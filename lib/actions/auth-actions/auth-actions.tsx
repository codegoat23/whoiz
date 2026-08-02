"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const signIn = async(email:string ,password: string ) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { deactivated: true },
    });

    if (user?.deactivated) {
        throw new Error("This account has been deactivated.");
    }

    const result = await auth.api.signInEmail({
        body: {
            email,
            password,
            callbackURL: '/'
        }
    })
    return result;
}

export const signUp = async(email:string ,password: string ,name:string) => {
    const result = await auth.api.signUpEmail({
        body: {
            email,
            password,
            name,
            callbackURL: '/'
        }
    })
    return result;
}

export const signOut = async() =>{
    const result = await auth.api.signOut({headers : await headers()})
}