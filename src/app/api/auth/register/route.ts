import { sendVerificationOTP } from "@/actions/send-otp.action";
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
      (data.role === Role.Customer && !data.customerProfile) ||
      !data.name ||
      !data.email ||
      !data.password ||
      !data.phone
    ) {
      // if role data is not present return error response
      return NextResponse.json(
        {
          error: "Incomplete Data for Registration.",
        },
        { status: 401 }
      );
    }

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        sellerProfile: true,
        customerProfile: true,
      },
    });

    if (userExists) {
      // if yes, check role and register
      if (data.role === Role.Seller && data.sellerProfile) {
        // Check or Make sure user does not already exists as seller.
        // If yes return error response.

        const isAlreadySeller = await prisma.user.findUnique({
          where: { email: data.email },
          include: {
            sellerProfile: true,
            customerProfile: true,
          },
        });

        if (isAlreadySeller?.sellerProfile !== null) {
          return NextResponse.json(
            {
              success: false,
              message: "User is already as seller!",
            },
            { status: 400 }
          );
        }

        try {
          let sellerData = null;
          await prisma.$transaction(async (tx) => {
            sellerData = await tx.sellerProfile.create({
              data: {
                userId: userExists.id,
                storeName: data.sellerProfile.storeName,
              },
            });
          });

          await auth.api.updateUser({
            body: {
              role: Role.Seller,
            },
          });

          sendVerificationOTP({
            email: userExists.email,
            type: "email-verification",
          });
          const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(userExists.email)}`;
          return NextResponse.json(
            {
              success: true,
              otpUrl: otpUrl,
              data: { ...userExists, profile: sellerData },
              message: "Registration successful!",
            },
            { status: 201 }
          );
        } catch (error) {
          console.log(
            "Prisma transaction failed: Seller Profile was not registered!"
          );
          return NextResponse.json(
            {
              success: false,
              message:
                "Prisma transaction failed: Seller Profile was not registered!",
            },
            { status: 500 }
          );
        }
      } else if (data.role === Role.Customer && data.customerProfile) {
        // Check or Make sure user does not already exits as customer.
        // If yes then return error response

        const isAlreadyCustomer = await prisma.user.findUnique({
          where: { email: data.email },
          include: {
            sellerProfile: true,
            customerProfile: true,
          },
        });

        if (isAlreadyCustomer?.customerProfile !== null) {
          return NextResponse.json({
            success: false,
            message: "User is already registered as Customer",
          });
        }

        try {
          let customerData = null;
          await prisma.$transaction(async (tx) => {
            customerData = await tx.customerProfile.create({
              data: {
                userId: userExists.id,
                address: data.customerProfile.address,
              },
            });
          })

          await auth.api.updateUser({
            body: {
              role: Role.Customer,
            },
          });

          sendVerificationOTP({
            email: userExists.email,
            type: "email-verification",
          });
          const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(userExists.email)}`;
          return NextResponse.json(
            {
              success: true,
              otpUrl: otpUrl,
              data: { ...userExists, profile: customerData },
              message: "Registration successful!",
            },
            { status: 201 }
          );
        } catch (error) {
          console.log(
            "Prisma transaction failed: Customer Profile was not created!"
          );
          return NextResponse.json(
            {
              success: false,
              message:
                "Prisma transaction failed: Customer Profile was not created!",
            },
            { status: 500 }
          );
        }
      }
    } else {
      // User is new, Register normally
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
      let profileData = null;
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
            profileData = await tx.sellerProfile.create({
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

            profileData = await tx.customerProfile.create({
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

      sendVerificationOTP({ email: user.email, type: "email-verification" });
      const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(user.email)}`;
      return NextResponse.json(
        {
          success: true,
          otpUrl,
          profile: profileData,
          message: "Registration successful!",
        },
        { status: 201 }
      );
    }
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
