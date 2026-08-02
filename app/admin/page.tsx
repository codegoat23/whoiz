import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminPage from "./AdminPage";
import { getSessionUser } from "@/lib/session";

export default async function Admin() {
 const user = await getSessionUser();

  return <AdminPage user={user} />;
}
