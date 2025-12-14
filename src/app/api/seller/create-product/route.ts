import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductData } from "@/types/form.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession();

    if (!session || !session.user) {
      return NextResponse.json(
        {
          error: "Unauthenticated request! Please Login.",
        },
        { status: 401 }
      );
    }

    const data: ProductData = await request.json();

    const seller = await prisma.sellerProfile.findUnique({
      where: { id: session.user.id },
    });

    if (!seller) {
      return NextResponse.json(
        {
          error: "Seller Profile not found!",
        },
        { status: 404 }
      );
    }

    const res = await prisma.product.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        inventory: data.inventory,
        deliveryTime: data.deliveryTime,
        sellerProfileId: seller.id,

        images: {
          create: data.images.map((img) => ({
            url: img.url,
            fileId: img.fileId,
          })),
        },

        tags: {
          connect: data.tags.map((t) => ({ id: t.id })),
        },
      },
    });

    if (!res) {
      return NextResponse.json(
        { error: "Product creation failed!" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product created successfully!"
    }, {status: 201})
    
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Product creation failed!" },
      { status: 400 }
    );
  }
}
