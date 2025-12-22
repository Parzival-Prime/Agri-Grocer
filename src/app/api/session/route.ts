import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"



export async function GET(req: NextRequest) {
  try {
    logger.info("getting session from auth.api.getSession ...")
    const session = await auth.api.getSession({
      query: {
        disableCookieCache: true,
      },
      headers: req.headers, // pass the headers
    })
    
    if (!session) {
      logger.error("session not found")
      return NextResponse.json({
        success: false,
        message: "Session not found for some reason!"
      }, { status: 400 })
    }

    logger.info("session found. getting user data.")
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        sellerProfile: true,
        customerProfile: true,
      },
    })

    logger.info("user: " + user)

    const profile = user?.role === "Seller" ? user?.sellerProfile : user?.customerProfile

    const data = {
      ...session.user,
      profile: profile
    }

    logger.info("returning success response ...")
    return NextResponse.json({
      success: true,
      session: session.session,
      user: data,
      message: "Successfully fetched user session."
    }, {
      headers: { "Cache-Control": "no-store" },
      status: 200
    })
  } catch (error) {
    console.log("Something went wrong in fetching user session")
  }
}


// A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component.

// This error occured when I clicked register after filling customer registration form. This error did not occur before, I just added few more input fields in customer and seller registration stage after that this error occured. Can you tell reason, if you need any page code to understand ask me.