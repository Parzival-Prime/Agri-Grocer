"use client";

import { Path, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SignUpStage2 from "@/components/forms/signup-stage-2";
import CustomerRegistration from "@/components/forms/customer-registration-form";
import SellerRegistration from "@/components/forms/seller-registration-form";
import SignupStage1 from "@/components/forms/signup-stage-1";
import { RegisterFormType, registerSchema, Stage } from "@/types/auth.types";

export default function Signup() {
  const [isPending, setIsPending] = useState(false);
  const [stage, setStage] = useState<Stage>("stage-1");
  const router = useRouter();

const form = useForm<RegisterFormType>({
  resolver: zodResolver(registerSchema),
  defaultValues: {
    role: undefined,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  },
});


  const selectedRole = useWatch({
    control: form.control,
    name: "role", // Field path as string
  });

  function getStepFields(stage: Stage): Path<RegisterFormType>[] {
    const role = form.watch("role");

    switch (stage) {
      case "stage-1":
        return ["name", "password", "confirmPassword", "email", "phone"];

      case "stage-2":
        return ["role"];

      case "stage-3":
        return role === "Seller"
          ? ["sellerProfile.storeName"]
          : ["customerProfile.address"];

      default:
        return [];
    }
  }

  const nextStage = async (cstage: Stage, nStage: Stage) => {
    const fields = getStepFields(cstage)
    const isValid = await form.trigger(fields)
    if (isValid) {
      if (cstage === "stage-3") {
        console.log("trigger form submission");
        form.handleSubmit(
          (data) => {
            console.log("SUBMITTED DATA:", data);
            onSubmit(data);
          },
          (errors) => {
            console.log("SUBMIT ERRORS:", errors);
          }
        )()
        return;
      }
      setStage(nStage)
    }
  };

  async function onSubmit(data: RegisterFormType) {
    setIsPending(true);
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords didn't match!");
      return;
    }
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json());

      if (res?.success) {
        toast.success("User registered sussefully!");
        console.log("Registration response: ", res)
      } else {
        toast.error("User registration failed!");
      }
    } catch (error) {
      toast.error("User registration failed!");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div>
      {stage == "stage-1" ? (
        <SignupStage1
          form={form}
          nextStage={nextStage}
          isPending={isPending}
          props={{}}
        />
      ) : stage == "stage-2" ? (
        <SignUpStage2 form={form} nextStage={nextStage} />
      ) : selectedRole === "Customer" ? (
        <CustomerRegistration />
      ) : (
        <SellerRegistration
          form={form}
          nextStage={nextStage}
          isPending={isPending}
        />
      )}
    </div>
  );
}
