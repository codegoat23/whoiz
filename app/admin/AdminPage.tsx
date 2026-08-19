"use client"

import ProfileCard from "./components/ProfileCard";
import { auth } from "@/lib/auth";

type User = typeof auth.$Infer.Session.user;

export default function AdminPage({ user }: { user: User }) {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full rounded-[30]">
        <ProfileCard fullname={user.name} bio={user.bio} id={user.id} avatarUrl={user.avatarUrl} />
      </div>
    </div>
  );
}
