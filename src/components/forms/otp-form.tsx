"use client"

// import { verifyOTP } from "@/actions/send-otp.action"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { OTPFormProps } from "@/types/actions.types"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useState } from "react"


export function OTPForm({ email, type }: OTPFormProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  async function verifyOTP(formData: FormData) {
    const otp = formData.get("otp") as string
    const email = formData.get("email") as string
    const type = formData.get("type") as string
      console.log(otp, email, type)

    if (!otp || !email || !type) {
      console.log("Missing Valuess")
    }
  
    try {
      switch (type) {
        case "email-verification": {
          await authClient.emailOtp.verifyEmail({ email, otp })
          router.push("/profile") // ✅ relative URL
          break
        }
  
        case "sign-in": {
          await authClient.signIn.emailOtp({ email, otp })
          router.push("/profile")
          break
        }
  
        case "reset-password": {
          await authClient.emailOtp.checkVerificationOtp({ email, type: "forget-password", otp })
          router.push("/auth/reset-password")
          break
        }
  
        default:
          console.log("invalid otp type")
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(!type || !email){
    toast.error("Missing verification details")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter verification code</CardTitle>
        <CardDescription>We sent a 6-digit code to your email.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={verifyOTP}>
          <FieldGroup>
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="type" value={type} />
            <Field>
              <FieldLabel htmlFor="otp">Verification code</FieldLabel>
              <InputOTP maxLength={6} id="otp" name="otp" required>
                <InputOTPGroup className="gap-2.5 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              <FieldDescription>
                Enter the 6-digit code sent to your email.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Button type="submit" disabled={isPending}>Verify</Button>
              <FieldDescription className="text-center">
                Didn&apos;t receive the code? <a href="#">Resend</a>
              </FieldDescription>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
