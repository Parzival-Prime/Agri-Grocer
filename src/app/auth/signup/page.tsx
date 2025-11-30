"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import { toast } from "sonner";
import SignUpStage2 from "@/components/forms/signup-stage-2";
import CustomerRegistration from "@/components/forms/customer-registration-form";
import SellerRegistration from "@/components/forms/seller-registration-form";
import SignupStage1 from "@/components/forms/signup-stage-1";

const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
});

type Stage = "stage-1" | "stage-2" | "stage-3";

export default function Signup() {
  const [isPending, setIsPending] = useState(false);
  const [stage, setStage] = useState<Stage>("stage-1");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (values.password !== values.confirmPassword) {
        toast.error(
          "Password and ConfirmPassword didn't match. Please try again."
        );
        return;
      }

      // await signUp.email(
      //   {
      //     name: values.name,
      //     email: values.email,
      //     password: values.password,
      //   },
      //   {
      //     onRequest: () => setIsPending(true),
      //     onResponse: () => setIsPending(false),
      //     onError: (ctx) => {
      //       toast.error(ctx.error.message);
      //     },
      //     onSuccess: () => {
      //       setStage("stage-2")
      //       toast.success(
      //         "User registered Successfully! Please check for verification email."
      //       );
      //     },
      //   }
      // );
      console.log("User Common data got!")
      setStage("stage-2")
    } catch (error) {
      console.log(error);
    }
  }

  async function signUpWithOAuth(provider: string) {
    await signIn.social({
      provider: provider,
    });
  }

  const [role, setRole] = useState<"seller" | "customer" | null>(null);

  const handleRoleSelection = (value: "seller" | "customer" | null) => {
    setRole(value);
    console.log("got role: ", role);
    setStage("stage-3")
  };

  return (
    <div>
      {stage == "stage-1" ? (
        <SignupStage1
          form={form}
          onSubmit={onSubmit}
          isPending={isPending}
          signUpWithOAuth={signUpWithOAuth}
          props={{}}
        />
      ) : stage == "stage-2" ? (<SignUpStage2 getRole={handleRoleSelection} />) : (
        role === "customer" ? 
            (<CustomerRegistration />) 
            : (<SellerRegistration />)
      )}
    </div>
  );
}
