"use client";

import { Path, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SignUpStage2 from "@/components/forms/signup-stage-2";
import CustomerRegistration from "@/components/forms/customer-registration-form";
import SellerRegistration from "@/components/forms/seller-registration-form";
import SignupStage1 from "@/components/forms/signup-stage-1";
import { FORM_ROLES, FormRole, GetSessionType, RegisterFormType, registerSchema, Stage, UserType } from "@/types/auth.types";

export default function FullSignupForm({session}: {session: GetSessionType}) {
  const [isPending, setIsPending] = useState(false);
  const [stage, setStage] = useState<Stage>("stage-1");
  const [userExists, setUserExists] = useState(false)
  const [country, setCountry] = useState("IND")
  const [state, setState] = useState("")
  const [haveStates, setHaveStates] = useState(true)
  const router = useRouter()

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "Customer",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  })

  const selectedRole = useWatch({
    control: form.control,
    name: "role", // Field path as string
  })

  function getStepFields(stage: Stage): Path<RegisterFormType>[] {
    const role = form.watch("role");

    switch (stage) {
      case "stage-1":
        return ["name", "password", "confirmPassword", "email", "phone"];

      case "stage-2":
        return ["role"];

      case "stage-3":
        return role === "Seller"
          ? ["sellerProfile.storeName",
            "sellerProfile.description",
            "sellerProfile.niche",
            "sellerProfile.city",
            "sellerProfile.country",
            "sellerProfile.gstNumber",
            "sellerProfile.licenseNumber",
            "sellerProfile.panNumber",
            "sellerProfile.storeAddressLine1",
            "sellerProfile.pincode",
            "sellerProfile.state",
            "sellerProfile.storeAddressLine2",
            "sellerProfile.supportPhone",
            "sellerProfile.supportEmail"
          ]
          : ["customerProfile.addressLine1",
            "customerProfile.addressLine2",
            "customerProfile.city",
            "customerProfile.country",
            "customerProfile.pincode",
            "customerProfile.state",
          ];

      default:
        return [];
    }
  }

  const nextStage = async (cstage: Stage, nStage: Stage) => {
    const fields = getStepFields(cstage);
    const isValid = await form.trigger(fields);
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
        )();
        return;
      }
      setStage(nStage);
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
        toast.success("User registered sucessfully! Check email for OTP.")
        router.push(res.otpUrl)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("User registration failed!");
    } finally {
      setIsPending(false);
    }
  }

  function toFormRole(role: string): FormRole | undefined {
  return FORM_ROLES.includes(role as FormRole)
    ? (role as FormRole)
    : undefined;
}


  function prefillForm(user: UserType){
    form.setValue("name", user.name)
    form.setValue("email", user.email)
    form.setValue("password", "********")
    form.setValue("confirmPassword", "********")
    const formRole = toFormRole(user.role);
    if (formRole !== undefined) {
    form.setValue("role", formRole);
    }
    form.setValue("phone", user.phone)
  }

  function setCountryFunc(){

  }

  useEffect(()=>{
    if(session){
        setUserExists(true)
        prefillForm(session.user)
    }
  }, [session])

  return (
    <div>
      {stage == "stage-1" ? (
        <SignupStage1
          form={form}
          nextStage={nextStage}
          isPending={isPending}
          userExists={userExists}
          props={{}}
        />
      ) : stage == "stage-2" ? (
        <SignUpStage2 form={form} nextStage={nextStage} />
      ) : selectedRole === "Customer" ? (
        <CustomerRegistration
          form={form}
          nextStage={nextStage}
          isPending={isPending}
          setCountry={setCountryFunc}
          country={country}
          haveStates={haveStates}
        />
      ) : (
        <SellerRegistration
          form={form}
          nextStage={nextStage}
          isPending={isPending}
          setCountry={setCountryFunc}
          country={country}
          haveStates={haveStates}
        />
      )}
    </div>
  )
}
