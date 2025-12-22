import { OTPForm } from "@/components/forms/otp-form";


export default async function OTPPage(
  { searchParams }
  : { searchParams: Promise<{ type: "email-verification" | "sign-in" | "reset-password", email: string }> }

) {
  const {type, email} = await searchParams

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs">
        <OTPForm
          email={email}
          type={type}
        />
      </div>
    </div>
  );
}
