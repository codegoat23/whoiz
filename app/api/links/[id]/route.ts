import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// ✅ simple delete using prisma.link.delete
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing link ID" }, { status: 400 });
    }

    // delete link from DB
    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/links error:", error);
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing link ID" }, { status: 400 });
    }

    // delete link from DB
    const updatedLink = await prisma.link.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, link:updatedLink },
       { status: 200 });
  } catch (error: any) {
    console.error("UPDATE /api/links error:", error);
    return NextResponse.json(
      { error: "Failed to Update link", 
        details: error.message
       },
      { status: 500 }
    );
  }
}