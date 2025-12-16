"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient, signIn } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { sendVerificationOTP } from "@/actions/send-otp.action";

const passwordSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const otpSchema = z.object({
  email: z.email(),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isPending, setIsPending] = useState(false);
  const [loginWithOTP, setLoginWithOTP] = useState(false);
  const router = useRouter();

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    mode: "onChange",
    defaultValues: { email: "" },
  });

  async function onOtpSubmit(values: z.infer<typeof otpSchema>) {
    try {
      const email = values.email;
      await authClient.emailOtp.sendVerificationOtp(
        {
          email: email,
          type: "sign-in",
        },
        {
          onSuccess: () => {
            toast.success("OTP sent! Check your email.");
            router.push(`/otp/verify?email=${email}&type=sign-in`);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      console.log(
        "Something went wrong while sending verification OTP. \n Error: ",
        error
      );
    }
  }

  async function onPasswordSubmit(values: z.infer<typeof passwordSchema>) {
    try {
      await signIn.email(
        { email: values.email, password: values.password },
        {
          onRequest: () => setIsPending(true),
          onResponse: () => setIsPending(false),
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Logged In Successfully!");
            router.push("/dashboard");
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function loginWithOAuth(provider: string) {
    await signIn.social({
      provider: provider,
    });
  }

  useEffect(() => {
    if (loginWithOTP) {
      // Sync password form email to OTP form
      const email = passwordForm.getValues("email");
      otpForm.reset({ email });
    } else {
      // Sync OTP form email to password form
      const email = otpForm.getValues("email");
      passwordForm.setValue("email", email);
    }
  }, [loginWithOTP]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!loginWithOTP ? (
            <Form {...passwordForm} key="password-form">
              <form
                onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={passwordForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={passwordForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field>
                  <Button className="w-full" type="submit" disabled={isPending}>
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={() => setLoginWithOTP(true)}
                  >
                    Login with OTP
                  </Button>
                </Field>
              </form>
            </Form>
          ) : (
            <Form {...otpForm} key="otp-form">
              <form
                onSubmit={otpForm.handleSubmit(onOtpSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={otpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Field className="w-full">
                  <Button type="submit" disabled={isPending}>
                    Send OTP
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={() => setLoginWithOTP(false)}
                  >
                    Login with Password
                  </Button>
                </Field>
              </form>
            </Form>
          )}

          <Field className="mt-3">
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => loginWithOAuth("google")}
            >
              Login with Google
            </Button>
            <Button
              variant="outline"
              type="button"
              disabled={isPending}
              onClick={() => loginWithOAuth("github")}
            >
              Login with Github
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account? <a href="/auth/signup">Sign up</a>
            </FieldDescription>
          </Field>
        </CardContent>
      </Card>
    </div>
  );
}
