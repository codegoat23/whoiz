import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getApiSessionUser } from "@/lib/session";

export async function PUT(req: Request) {
  try {
    const user = await getApiSessionUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { favArtist, favPlaylist, spotifyAcc, favSong } = body;

    const data: {
      favArtist?: string;
      favPlaylist?: string;
      spotifyAcc?: string;
      favSong?: string;
    } = {};

    if (typeof favArtist === "string") data.favArtist = favArtist;
    if (typeof favPlaylist === "string") data.favPlaylist = favPlaylist;
    if (typeof spotifyAcc === "string") data.spotifyAcc = spotifyAcc;
    if (typeof favSong === "string") data.favSong = favSong;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
      select: {
        id: true,
        favArtist: true,
        favPlaylist: true,
        spotifyAcc: true,
        favSong: true,
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("UPDATE /api/spotify error:", error);
    return NextResponse.json(
      { error: "Failed to update spotify info" },
      { status: 500 }
    );
  }
}
