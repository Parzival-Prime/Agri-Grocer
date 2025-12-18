import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/argon2";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/resend";
import { toast } from "sonner";
import { Role } from "@/generated/prisma/enums";
import { emailOTP } from "better-auth/plugins";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },

  user: {
    additionalFields: {
      name: {
        type: "string",
      },
      role: {
        type: [Role.Admin, Role.Customer, Role.Seller],
      },
      phone: {
        type: "string",
      }
    },
  },

  // emailVerification: {
  //   sendVerificationEmail: sendVerificationEmailFunction,
  //   sendOnSignUp: true,
  //   autoSignInAfterVerification: true,
  //   async afterEmailVerification(user, request) {
  //     toast.success("User verified Successfully!");
  //     console.log("User Verified Successfully!");
  //   },
  // },

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  session: {
    expiresIn: 10 * 24 * 60 * 60,
  },

  plugins: [
    emailOTP({
      overrideDefaultEmailVerification: true,
      otpLength: 6,
      expiresIn: 300,
      allowedAttempts: 5,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          sendVerificationEmail({email, otp: otp.split('')})
        } else if (type === "email-verification") {
          sendVerificationEmail({email, otp: otp.split('')})
        } else {
          sendPasswordResetEmail({email, otp})
        }
      },
    }),
  ],
});
