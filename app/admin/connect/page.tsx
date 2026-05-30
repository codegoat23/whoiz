import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ConnectPage from "./Connectpage";

export default async function AdminConnect() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const user = session.user;

  // fetch socials here (SERVER SIDE)
  const res = await fetch(
`${process.env.APP_URL}/api/social-connect?userId=${user.id}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  return  <ConnectPage
      userId={user.id}
      initialSocials={data.socials || []}
    />;
}