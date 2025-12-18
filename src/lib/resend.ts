import OTPEmail from "@/components/emails/OTPEmail";
import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import {
  PasswordResetEmailProps,
  VerificationEmailProps,
} from "@/types/resend.types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  otp,
}: VerificationEmailProps) {
  try {

    const res = await resend.emails.send({
      from: "Agri-Grocer <dev@mails.parzivalprime.me>",
      to: [email],
      subject: "Verify your Email Address",
      react: OTPEmail({ email: email, otp: otp }),
    });
  } catch (error) {
    console.log("Error occured in resend.ts: ", error)
  }
}

export async function sendPasswordResetEmail({
  email,
  otp,
}: PasswordResetEmailProps) {
  await resend.emails.send({
    from: "Agri-Grocer <dev@mails.parzivalprime.me>",
    to: [email],
    subject: "Reset your Password",
    react: PasswordResetEmail({ email: email, otp: otp }),
  });
}




