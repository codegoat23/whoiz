"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { User, KeyRound, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { PasswordInput } from "@/components/password-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { signOut } from "@/lib/auth-client";
import {
  updateAccountInfo,
  changePassword,
  deactivateAccount,
} from "./actions";

type SettingsUser = {
  id: string;
  name: string;
  email: string;
  username: string | null;
};

interface SettingsClientProps {
  user: SettingsUser;
}

export function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username ?? "");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingAccount, setSavingAccount] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [deactivating, setDeactivating] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleSaveAccount = async () => {
    setSavingAccount(true);
    try {
      const result = await updateAccountInfo({ name, username });
      if (!result.success) throw new Error(result.error ?? "Failed to save");

      toast.success("Account information updated");
    } catch (error: any) {
      toast.error(error.message || "Failed to save account information");
    } finally {
      setSavingAccount(false);
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setSavingPassword(true);
    try {
      const result = await changePassword({
        currentPassword,
        newPassword,
      });

      if (!result.success) throw new Error(result.error ?? "Failed to change password");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password changed successfully");
    } catch (error: any) {
      toast.error(error.message || "Failed to change password");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleDeactivate = async () => {
    setDeactivating(true);
    try {
      const result = await deactivateAccount();
      if (!result.success) throw new Error(result.error ?? "Failed to deactivate");

      setConfirmOpen(false);
      await signOut();
      toast.success("Your account has been deactivated");
      router.push("/auth/login?deactivated=1");
    } catch (error: any) {
      toast.error(error.message || "Failed to deactivate account");
      setDeactivating(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* ================= ACCOUNT INFO ================= */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
            <User className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-white/90">Account Information</CardTitle>
            <CardDescription className="text-sm text-white/40">
              Update your display name and username
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="settings-name">Display Name</FieldLabel>
              <Input
                id="settings-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="settings-username">Username</FieldLabel>
              <Input
                id="settings-username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
              />
              <FieldDescription>
                This is your public profile URL: whoiz.bio/{username || "…"}
              </FieldDescription>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="settings-email">Email</FieldLabel>
            <Input
              id="settings-email"
              value={user.email}
              readOnly
              disabled
              className="bg-black/40 border-white/10 text-white/60"
            />
          </Field>

          <div className="flex justify-end">
            <Button
              onClick={handleSaveAccount}
              disabled={savingAccount}
              className="
                rounded-xl font-semibold
                bg-orange-500 text-white
                hover:from-orange-400 hover:to-amber-300
                transition-all duration-300
              "
            >
              {savingAccount ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= PASSWORD ================= */}
      <Card className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center">
            <KeyRound className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-white/90">Change Password</CardTitle>
            <CardDescription className="text-sm text-white/40">
              You will be signed out of all other devices
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <Field>
            <FieldLabel htmlFor="settings-current-password">Current Password</FieldLabel>
            <PasswordInput
              id="settings-current-password"
              name="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="bg-black/40 border-white/10 text-white"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="settings-new-password">New Password</FieldLabel>
              <PasswordInput
                id="settings-new-password"
                name="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="settings-confirm-password">Confirm New Password</FieldLabel>
              <PasswordInput
                id="settings-confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-black/40 border-white/10 text-white"
              />
            </Field>
          </div>

          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>

          <div className="flex justify-end">
            <Button
              onClick={handleChangePassword}
              disabled={savingPassword}
              className="
                rounded-xl font-semibold
                bg-orange-500 text-white
                hover:from-orange-400 hover:to-amber-300
                transition-all duration-300
              "
            >
              {savingPassword ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ================= DANGER ZONE ================= */}
      <Card className="border border-red-500/20 bg-red-500/5 backdrop-blur-xl rounded-2xl">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
            <TriangleAlert className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <CardTitle className="text-lg text-red-200">Danger Zone</CardTitle>
            <CardDescription className="text-sm text-red-200/50">
              Deactivating hides your public profile. Your data is kept and can be restored later.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex justify-end">
          <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="
                  rounded-xl font-semibold
                  border-red-500/30 text-red-300
                  bg-red-500/10
                  hover:bg-red-500/20 hover:text-red-200
                  transition-all duration-300
                "
              >
                Deactivate Account
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-[#0f0f0f] border border-white/10 backdrop-blur-xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Deactivate your account?
                </DialogTitle>
                <DialogDescription className="text-white/60">
                  Your public profile will no longer be visible. Your data will be
                  kept, and the account can be reactivated by contacting support.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmOpen(false)}
                  disabled={deactivating}
                  className="border-white/10 bg-white/5 text-white/70"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeactivate}
                  disabled={deactivating}
                  className="
                    rounded-xl font-semibold
                    bg-red-500 text-white
                    hover:bg-red-600
                    transition-all duration-300
                  "
                >
                  {deactivating ? "Deactivating..." : "Deactivate"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
