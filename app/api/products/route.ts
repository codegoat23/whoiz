import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

/* ======================================================
   GET /api/products
   ====================================================== */
export async function GET() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await prisma.product.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(products);
}

/* ======================================================
   POST /api/products
   ====================================================== */
export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, description, imageUrl, action } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Product name is required" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        imageUrl,
        action: action ?? "Draft",
        ownerId: session.user.id,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

/* ======================================================
   PUT /api/products
   ====================================================== */
export async function PUT(req: NextRequest) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
        ownerId: session.user.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json(
      {
        error: "Failed to update product",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE /api/products
   ====================================================== */
export async function DELETE(req: NextRequest) {
  try {
    const headersList = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findFirst({
      where: {
        id,
        ownerId: session.user.id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}