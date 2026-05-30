"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { GalleryVerticalEnd } from "lucide-react";
import { signIn, signUp } from "@/lib/actions/auth-actions/auth-actions";
import { SignupForm } from "@/components/signup-form";
import { LoginForm } from "@/components/login-form";


export default function AuthPage() {
  const router = useRouter();

  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string | null;
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;
    const confirmPassword = formData.get("confirm-password") as string | null;

    // ✅ Different validation for sign in vs sign up
    if (isSignIn) {
      if (!email || !password) {
        setErrorMsg("Please enter email and password.");
        return;
      }
    } else {
      if (!name || !email || !password || !confirmPassword) {
        setErrorMsg("Please fill all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg("Passwords do not match.");
        return;
      }

      if (password.length < 8) {
        setErrorMsg("Password must be at least 8 characters.");
        return;
      }
    }

    setIsLoading(true);

    try {
      let result;

      if (isSignIn) {
        result = await signIn(email!, password!);
        if (!result || !result.user) {
          setErrorMsg("Invalid email or password.");
          return;
        }
      } else {
        result = await signUp(email!, password!, name!);
        if (!result || !result.user) {
          setErrorMsg("Failed to create account.");
          return;
        }
      }

      // ✅ SUCCESS – redirect or refresh
    router.refresh()

    } catch (err) {
      console.error("Unexpected auth error:", err);
      setErrorMsg("Unexpected error. Try again.");
    } finally {
      setIsLoading(false);
    }
   
  };
 

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Whoiz
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {errorMsg && (
              <p className="mb-3 text-sm text-red-600 text-center">
                {errorMsg}
              </p>
            )}
            {isSignIn === true ?
            <LoginForm onSubmit={handleSubmit}
            onSwitchToSignUp={()=> setIsSignIn(false)}
            />
            :
             <SignupForm
              onSubmit={handleSubmit}
              
              
            />
            
            
          }
           
          </div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <img
          src="/prodill.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
