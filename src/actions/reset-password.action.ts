"use server"

import { auth } from "@/lib/auth";
import { ResetPasswordProps } from "@/types/actions.types";
import { NextResponse } from "next/server";
import { toast } from "sonner";



export async function resetPassword({
  email,
  otp,
  newPassword,
}: ResetPasswordProps) {
  try {
    const { success } = await auth.api.resetPasswordEmailOTP({
      body: {
        email: email,
        otp: otp,
        password: newPassword,
      },
    });

    if (success) {
      console.log("Password reset Successful!");
    } else {
      toast.error("Password reset failed!");
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log(
      "Something went wrong while resetting password! \n Error: ",
      error
    );
    NextResponse.json(
      {
        error: error,
      },
      { status: 400 }
    );
  }
}
