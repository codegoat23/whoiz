import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, favArtist,favPlaylist,spotifyAcc,favSong } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        favArtist,
        favPlaylist,
        spotifyAcc,
        favSong,
      },
    });

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("UPDATE /api/spotify error:", error);
    return NextResponse.json(
      {
        error: "Failed to update spotify info",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
