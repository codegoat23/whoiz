"use client";

import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import Link from "next/link";

interface LoginFormProps extends React.ComponentProps<"form"> {
  isLoading?: boolean;
}

export function LoginForm({ className, isLoading, ...props }: LoginFormProps) {
  return (
    <div className="relative">
      {/* FORM */}
      <form
        className={cn(
          "flex flex-col gap-6 transition-all duration-200",
          isLoading && "opacity-60 pointer-events-none blur-[1px]",
          className
        )}
        {...props}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
              Enter your email below to login to your account
            </p>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
            />
          </Field>

          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <a
                href="/forgot-password"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <PasswordInput
              id="password"
              name="password"
              required
              disabled={isLoading}
            />
          </Field>

          <Field>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </Field>

          <Field>
            <FieldDescription className="text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary hover:underline"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>

      {/* OVERLAY LOADER */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-md">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Authenticating...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
