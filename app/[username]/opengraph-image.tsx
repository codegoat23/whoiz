import { notFound } from "next/navigation";
import { buildOgCard, OG_SIZE, OG_ALT } from "./og-card";

export const runtime = "nodejs";
export const alt = OG_ALT;
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ username?: string }>;
}) {
  const { username } = await params;
  if (!username) notFound();
  return buildOgCard(username);
}
