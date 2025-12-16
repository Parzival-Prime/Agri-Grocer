import { verifyOTP } from "@/actions/send-otp.action";
import { OTPForm } from "@/components/forms/otp-form";
import { toast } from "sonner";

export default async function OTPPage({ searchParams }: { searchParams: Promise<{ type: "email-verification" | "sign-in" | "reset-password", email: string }> }) {
  const {type, email} = await searchParams

  if(!type || !email){
    toast.error("Missing verification details")
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm
          email={email}
          type={type}
          action={verifyOTP}
        />
      </div>
    </div>
  );
}
