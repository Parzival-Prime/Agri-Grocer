import { PasswordResetEmail } from "@/components/emails/PasswordResetEmail";
import { VerificationEmail } from "@/components/emails/VerificationEmail";
import { User } from "better-auth";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendVerificationEmailProps {
  user: User;
  url: string;
}

export interface SendPasswordResetEmailProps {
  user: User;
  url: string;
}

export async function sendVerificationEmailFunction({
  user,
  url,
}: SendVerificationEmailProps) {
  await resend.emails.send({
    from: "Agri-Grocer <onboarding@resend.dev>",
    to: [user.email],
    subject: "Verify your Email Address",
    react: VerificationEmail({ email: user.email, link: url }),
  });
  console.log("Verification Email sent.")
}

export async function sendPasswordResetEmail({
  user,
  url,
}: SendPasswordResetEmailProps){
    await resend.emails.send({
    from: "Agri-Grocer <onboarding@resend.dev>",
    to: [user.email],
    subject: "Reset your Password",
    react: PasswordResetEmail({email: user.email, link: url})
    })
    console.log("Password reset email sent.")
}
