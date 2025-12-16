import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const baseSchema = {
  name: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  phone: z.string().min(10),
};

export const registerSchema = z.discriminatedUnion("role", [
  z.object({
    ...baseSchema,
    role: z.literal("Seller"),
    sellerProfile: z.object({
      storeName: z.string().min(1, "Store name required"),
    }),
  }),

  z.object({
    ...baseSchema,
    role: z.literal("Customer"),
    customerProfile: z.object({
      address: z.string().min(1, "Address required"),
    }),
  }),
]);


export type Stage = "stage-1" | "stage-2" | "stage-3";

export type RegisterFormType = z.infer<typeof registerSchema>;

export interface SignupStage1Props {
  form: UseFormReturn<RegisterFormType>;
  nextStage: (cstage: Stage, nStage: Stage) => void;
  isPending: boolean;
  props?: Record<string, any>;
}

export interface SignupStage2Props {
  form: UseFormReturn<RegisterFormType>;
  nextStage: (cstage: Stage, nStage: Stage) => void;
}


export interface SignupStage3Props {
  form: UseFormReturn<RegisterFormType>
  // onSubmit: (values: RegisterFormType) => Promise<void>;
  nextStage: (cstage: Stage, nStage: Stage) => void;
  isPending: boolean;
}