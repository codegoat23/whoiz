"use client"

import ProfileCard from "./components/ProfileCard";

type User = {
  id: string;
  name: string;
  bio: string | null;
  story: string | null;
  avatarUrl: string | null;
};

export default function AdminPage({ user }: { user: User }) {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto w-full rounded-[30]">
        <ProfileCard
          id={user.id}
          fullname={user.name}
          bio={user.bio}
          story={user.story}
          avatarUrl={user.avatarUrl}
        />
      </div>
    </div>
  );
}
