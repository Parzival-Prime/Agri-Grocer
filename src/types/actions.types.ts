
export interface SendVerificationEmailProps {
  email: string;
  type: "sign-in" | "email-verification" | "forget-password";
}

export interface SignInEmailOTPProps {
  email: string;
  otp: string;
}

export interface VerifyEmailVerificationOTPProps {
  email: string;
  otp: string;
}

export interface VerifyPasswordResetOTPProps {
  email: string;
  otp: string;
}




export interface OTPFormProps {
  email: string
  type: 'email-verification' | 'sign-in' | 'reset-password'
  action: (prevState: any, formData: FormData) => Promise<{ error?: string }>
}



export interface ResetPasswordProps {
  email: string;
  otp: string;
  newPassword: string;
}