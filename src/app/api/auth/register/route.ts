import { sendVerificationOTP } from "@/actions/send-otp.action";
import { Role } from "@/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RegisterFormType } from "@/types/auth.types";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
  logger.info("Inside register route")
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
      logger.error("Some data is missing!")
      return NextResponse.json(
        {
          error: "Incomplete Data for Registration.",
        },
        { status: 401 }
      );
    }

    logger.info("Checking if user already exists...")
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        sellerProfile: true,
        customerProfile: true,
      },
    });

    if (userExists) {
      logger.info("User already Exists")
      // if yes, check role and register
      if (data.role === Role.Seller && data.sellerProfile) {
        // Check or Make sure user does not already exists as seller.
        // If yes return error response.
        logger.info("Creating seller profile")

        const isAlreadySeller = await prisma.user.findUnique({
          where: { email: data.email },
          include: {
            sellerProfile: true,
            customerProfile: true,
          },
        });

        if (isAlreadySeller?.sellerProfile !== null) {
          logger.error("User already has seller profile")
          return NextResponse.json(
            {
              success: false,
              message: "User is already as seller!",
            },
            { status: 400 }
          );
        }

        logger.info("User does not already have seller profile")

        try {
          let sellerData = null;
          logger.info("Executing prisma transaction")
          await prisma.$transaction(async (tx) => {
            sellerData = await tx.sellerProfile.create({
              data: {
                userId: userExists.id,
                storeName: data.sellerProfile.storeName,
                description: data.sellerProfile.description,
                niche: data.sellerProfile.niche,
                supportPhone: data.sellerProfile.supportPhone,
                supportEmail: data.sellerProfile.supportEmail,
                storeAddressLine1: data.sellerProfile.storeAddressLine1,
                storeAddressLine2: data.sellerProfile.storeAddressLine2,
                country: data.sellerProfile.country,
                state: data.sellerProfile?.state || "",
                city: data.sellerProfile.city,
                pincode: data.sellerProfile.pincode,
                gstNumber: data.sellerProfile.gstNumber,
                panNumber: data.sellerProfile.panNumber,
                licenseNumber: data.sellerProfile.licenseNumber,
              },
            });
          });

          logger.info("Prisma transaction executed successfully")
          try {
            logger.info("Updating user role")
            const res = await auth.api.updateUser({body: {role: "Customer"}})
            if(!res.status){
              logger.error("user role not updated")
            } else {
              logger.info("user role updated")
            }
          } catch (error) {
            logger.error("Something went wrong while updating user role")
          }

          logger.info("Sending verification otp...")
          sendVerificationOTP({
            email: userExists.email,
            type: "email-verification",
          });
          const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(userExists.email)}`;

          logger.info("Returning success response")
          return NextResponse.json(
            {
              success: true,
              otpUrl,
              data: { ...userExists, profile: sellerData },
              message: "Registration successful!",
            },
            { status: 201 }
          );
        } catch (error) {
          logger.error(
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
        logger.info("Creating customer profile...")
        const isAlreadyCustomer = await prisma.user.findUnique({
          where: { email: data.email },
          include: {
            sellerProfile: true,
            customerProfile: true,
          },
        });

        if (isAlreadyCustomer?.customerProfile !== null) {
          logger.error("User already have customer profile.")
          return NextResponse.json({
            success: false,
            message: "User is already registered as Customer",
          });
        }
        logger.info("User does not already have customer profile.")
        try {
          let customerData = null;
          logger.info("Executing Prisma transaction...")
          await prisma.$transaction(async (tx) => {
            customerData = await tx.customerProfile.create({
              data: {
                userId: userExists.id,
                addressLine1: data.customerProfile.addressLine1,
                addressLine2: data.customerProfile.addressLine2,
                country: data.customerProfile.country,
                state: data.customerProfile?.state || "",
                city: data.customerProfile.city,
                pincode: data.customerProfile.pincode,
              },
            });
          })

          logger.info("Prisma transaction executed successfully")

          try {
            logger.info("updating user role...")
            const res = await auth.api.updateUser({body: {role: "Customer"}})
            if(!res.status){
              logger.error("user role not updated")
            } else {
              logger.info("user role updated")
            }
          } catch (error) {
            logger.error("something went wrong while updating user role")
          }

          logger.info("sending verification otp...")
          sendVerificationOTP({
            email: userExists.email,
            type: "email-verification",
          });
          const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(userExists.email)}`;
          logger.info("returning success response")
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
          logger.error(
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
      logger.info("User does not already exists, creating new user...")
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
        logger.error("User creation failed")
        NextResponse.json(
          {
            error: "User Registration failed",
          },
          { status: 400 }
        );
      }

      logger.info("New user created")
      let profileData = null;
      try {
        await prisma.$transaction(async (tx) => {
          if (data.role === Role.Seller) {
            logger.info("creating seller profile...")
            const sellerProfile = data.sellerProfile;

            if (!sellerProfile) {
              logger.error("missing seller profile")
              return NextResponse.json(
                { error: "Seller profile required" },
                { status: 400 }
              );
            }
            try {
              logger.info("executing prisma transaction...")
              profileData = await tx.sellerProfile.create({
                data: {
                  userId: user.id,
                  storeName: data.sellerProfile.storeName,
                  description: data.sellerProfile.description,
                  niche: data.sellerProfile.niche,
                  supportPhone: data.sellerProfile.supportPhone,
                  supportEmail: data.sellerProfile.supportEmail,
                  storeAddressLine1: data.sellerProfile.storeAddressLine1,
                  storeAddressLine2: data.sellerProfile.storeAddressLine2,
                  country: data.sellerProfile.country,
                  state: data.sellerProfile?.state || "",
                  city: data.sellerProfile.city,
                  pincode: data.sellerProfile.pincode,
                  gstNumber: data.sellerProfile.gstNumber,
                  panNumber: data.sellerProfile.panNumber,
                  licenseNumber: data.sellerProfile.licenseNumber,
                },
              });
            } catch (error) {
              logger.error("Prisma transaction failed seller profile not created")
            }
          }

          if (data.role === Role.Customer) {
            logger.info("creating customer profile...")
            const customerProfile = data.customerProfile;

            if (!customerProfile) {
              logger.error("missing customer profile data")
              return NextResponse.json(
                { error: "Customer profile required" },
                { status: 400 }
              );
            }
            try {
              logger.info("executing prisma transaction...")
              profileData = await tx.customerProfile.create({
              data: {
                userId: user.id,
                addressLine1: data.customerProfile.addressLine1,
                addressLine2: data.customerProfile.addressLine2,
                country: data.customerProfile.country,
                state: data.customerProfile?.state || "",
                city: data.customerProfile.city,
                pincode: data.customerProfile.pincode,
              },
            });
            } catch (error) {
              logger.error("prisma transaction failed")
            }
          }
        });
      } catch (err) {
        logger.error( "Profile setup failed")
        return NextResponse.json(
          {
            error: "Profile setup failed. Please complete onboarding.",
            code: "ONBOARDING_INCOMPLETE",
          },
          { status: 500 }
        );
      }

      logger.info("user and profile created sending verification otp...")
      sendVerificationOTP({ email: user.email, type: "email-verification" });
      const otpUrl = `/otp/verify?type=email-verification&email=${encodeURIComponent(user.email)}`

      logger.error("returning success response...")
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
