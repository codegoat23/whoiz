import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { storage } from "@/lib/storage";

const FREE_PRODUCT_LIMIT = 2;

/* ======================================================
   GET /api/products
   ====================================================== */
export async function GET() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(headersList),
  });

  if (!session?.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const products = await prisma.product.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(products);
}

/* ======================================================
   POST /api/products  (create)
   ====================================================== */
export async function POST(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 🔒 Free plan limit
  

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
        ownerId: userId,
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
   PUT /api/products  (update)
   ====================================================== */
export async function PUT(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id, name, description, imageUrl, action } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    // 🔎 ownership check
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

    const data: {
      name?: string;
      description?: string | null;
      imageUrl?: string | null;
      action?: "Publish" | "Draft";
    } = {};

    if (typeof name === "string") data.name = name;
    if (typeof description === "string" || description === null) {
      data.description = description;
    }
    if (typeof imageUrl === "string" || imageUrl === null) {
      data.imageUrl = imageUrl;
    }
    if (action === "Publish" || action === "Draft") data.action = action;

    const updatedProduct = await prisma.product.update({
      where: { id },
      data,
    });

    // 🗑️ Remove the previous image only after the update succeeded,
    // and only if no other product still references it.
    if (product.imageUrl && product.imageUrl !== updatedProduct.imageUrl) {
      const stillInUse = await prisma.product.findFirst({
        where: {
          imageUrl: product.imageUrl,
          id: { not: id },
        },
        select: { id: true },
      });

      if (!stillInUse) {
        try {
          await storage.delete(product.imageUrl);
        } catch (error) {
          console.error(
            "[storage] Failed to delete old product image:",
            error
          );
        }
      }
    }

    return NextResponse.json(
      { success: true, product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json(
      {
        error: "Failed to update product",
      },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE /api/products
   ====================================================== */
export async function DELETE(req: Request) {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: Object.fromEntries(headersList),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    // 🔎 ownership check
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

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
