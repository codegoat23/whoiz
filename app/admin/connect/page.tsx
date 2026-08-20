import ConnectPage from "./Connectpage";
import { getSessionUser } from "@/lib/session";
import { getSocials } from "@/lib/social-connect";

export default async function AdminConnect() {
  const user = await getSessionUser();

  const socials = await getSocials(user.id);

  return (
    <ConnectPage initialSocials={socials}/>
  );
}