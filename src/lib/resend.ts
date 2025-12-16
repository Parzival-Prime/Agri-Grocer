import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { PasswordResetEmailProps, VerificationEmailProps } from "@/types/resend.types";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail({
  email,
  otp,
}: VerificationEmailProps) {
  await resend.emails.send({
    from: "Agri-Grocer <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your Email Address",
    react: VerificationEmail({ email: email, otp: otp }),
  })
}

export async function sendPasswordResetEmail({
  email,
  otp,
}: PasswordResetEmailProps){
    await resend.emails.send({
    from: "Agri-Grocer <onboarding@resend.dev>",
    to: [email],
    subject: "Reset your Password",
    react: PasswordResetEmail({email: email, otp: otp})
    })
}
