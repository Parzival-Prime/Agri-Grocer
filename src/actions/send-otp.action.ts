"use server"

import { auth } from "@/lib/auth";
import {
  SendVerificationEmailProps,
  SignInEmailOTPProps,
  VerifyEmailVerificationOTPProps,
  VerifyPasswordResetOTPProps,
} from "@/types/actions.types"
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function sendVerificationOTP({
  email,
  type,
}: SendVerificationEmailProps) {
  try {
    auth.api.sendVerificationOTP({
      body: {
        email: email,
        type: type,
      },
    }).catch(err => console.error('OTP send failed:', err));

    return NextResponse.json({success: true }, { status: 200 })
  } catch (error) {
    console.log("Something went wrong while sending verification OTP.\n Error: ", error )
    return NextResponse.json({ error:  'Failed to send OTP. Problem occured in sendVerificationOTP Server Action.'  }, { status: 400 })
  }
}

export async function signInEmailOTP({ email, otp }: SignInEmailOTPProps) {
  try {
    const data = await auth.api.signInEmailOTP({
      body: {
        email: email,
        otp: otp,
      },
    });

    if (data?.user && data?.user?.emailVerified) {
      console.log("SignIn Successful!");
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (error) {
    console.log(
      "Something went wrong while sending signing In with OTP.\n Error: ",
      error
    );
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function verifyEmailVerificationOTP({
  email,
  otp,
}: VerifyEmailVerificationOTPProps) {
  console.log("In verification function: Email: " + email + " OTP: " + otp)
  try {
    const data = await auth.api.verifyEmailOTP({
      body: {
        email: email,
        otp: otp,
      },
    });

    console.log("verification response: ", data)
    if (data?.status) {
      console.log("Email Verification Successful!");
    }

    return NextResponse.json({ success: true, data: data }, { status: 200 })
  } catch (error) {
    console.log("Something went wrong while verifying Email verification OTP.\n Error: ", error)
    return NextResponse.json({ error: error }, { status: 400 })
  }
}

export async function sendPasswordResetOTP(email: string) {
  try {
    const { success } = await auth.api.forgetPasswordEmailOTP({
      body: {
        email: email,
      },
    });

    if (success) {
      console.log("Password Reset OTP sent.");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(
      "Something went wrong while sending Password Reset OTP.\n Error: ",
      error
    );
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function verifyPasswordResetOTP({
  email,
  otp,
}: VerifyPasswordResetOTPProps) {
  try {
    const { success } = await auth.api.checkVerificationOTP({
      body: {
        email: email,
        type: "forget-password",
        otp: otp,
      },
    });

    if (success) {
      console.log("OTP verified!");
    }

    return NextResponse.json(
      {
        success: true,
        otp: otp,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(
      "Something went wrong while sending Password Reset OTP.\n Error: ",
      error
    );
    return NextResponse.json({ error: error }, { status: 400 });
  }
}





export async function verifyOTP(
  prevState: any,
  formData: FormData
) {
  const otp = formData.get("otp") as string
  const email = formData.get("email") as string
  const type = formData.get("type") as string

  if (!otp || !email || !type) {
    return { error: "Missing required fields" }
  }

  try {
    switch (type) {
      case "email-verification": {
        await verifyEmailVerificationOTP({ email, otp })
        redirect("/dashboard") // ✅ relative URL
      }

      case "sign-in": {
        await signInEmailOTP({ email, otp })
        redirect("/profile")
      }

      case "reset-password": {
        await verifyPasswordResetOTP({ email, otp })
        redirect("/auth/reset-password")
      }

      default:
        return { error: "Invalid OTP type" }
    }
  } catch (error) {
    // IMPORTANT: let redirect errors pass through
    if ((error as any)?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error
    }

    console.error("Verify OTP error:", error)
    return { error: "Invalid OTP or email" }
  }
}

