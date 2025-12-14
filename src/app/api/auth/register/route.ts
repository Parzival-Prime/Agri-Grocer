import { Role } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RegisterFormType } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data: RegisterFormType = await request.json();

    if (
      (data.role === Role.Seller && !data.sellerProfile) ||
      (data.role === Role.Customer && !data.customerProfile)
    ) {
      return NextResponse.json(
        {
          error: "Incomplete Data for Registration.",
        },
        { status: 401 }
      );
    }``

    const { user } = await auth.api.signUpEmail({
      body: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      },
    });

    if (!user) {
      NextResponse.json(
        {
          error: "User Registration failed",
        },
        { status: 400 }
      );
    }

    try {
      await prisma.$transaction(async (tx) => {
        if (data.role === Role.Seller) {
          const sellerProfile = data.sellerProfile;

          if (!sellerProfile) {
            return NextResponse.json(
              { error: "Seller profile required" },
              { status: 400 }
            );
          }
          await prisma.sellerProfile.create({
            data: {
              userId: user.id,
              storeName: sellerProfile.storeName,
            },
          });
        }

        if (data.role === Role.Customer) {
          const customerProfile = data.customerProfile;

          if (!customerProfile) {
            return NextResponse.json(
              { error: "Customer profile required" },
              { status: 400 }
            );
          }

          await tx.customerProfile.create({
            data: {
              userId: user.id,
              address: customerProfile.address,
            },
          });
        }
      });
    } catch (err) {
      console.error("Onboarding failed:", err);

      return NextResponse.json(
        {
          error: "Profile setup failed. Please complete onboarding.",
          code: "ONBOARDING_INCOMPLETE",
        },
        { status: 500 }
      );
    }


    return NextResponse.json({
      success: true,
      message: "User created Successfully!"
    }, {status: 201})

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Registration Unsuccessful!",
      },
      { status: 500 }
    );
  }
}
