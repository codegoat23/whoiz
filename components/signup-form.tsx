import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"
import Link from "next/link"

export function SignupForm({
  className,
  prefilledUsername,
  isLoading,
  ...props
}: React.ComponentProps<"form"> & {
  prefilledUsername?: string
  isLoading?: boolean
}) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        {prefilledUsername && (
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              name="username"
              type="text"
              value={prefilledUsername}
              readOnly
              tabIndex={-1}
              className="bg-muted/50 cursor-not-allowed"
            />
            <FieldDescription>
              Your public identity on WHOIZ.
            </FieldDescription>
          </Field>
        )}
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
           id="name"
            name="name"
            type="text"
            placeholder="denny"
            disabled={isLoading}
            required />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
          id="email"
          type="email"
          name="email"
          placeholder="m@example.com"
          disabled={isLoading}
          required />
          <FieldDescription>
            We&apos;ll use this to contact you. We will not share your email
            with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <PasswordInput id="password" name="password" disabled={isLoading} required />
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <PasswordInput id="confirm-password" name="confirm-password" disabled={isLoading} required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="animate-spin" />}
            {isLoading ? "Creating account..." : "Create Account"}
          </Button>
        </Field>

        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <Link href="/auth/login" >Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
