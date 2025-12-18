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
export type RegisterRole = RegisterFormType["role"];

export const FORM_ROLES: RegisterRole[] = ["Seller", "Customer"];
export type FormRole = (typeof FORM_ROLES)[number];

export interface SignupStage1Props {
  form: UseFormReturn<RegisterFormType>;
  nextStage: (cstage: Stage, nStage: Stage) => void;
  isPending: boolean;
  userExists: boolean
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



export type GetSessionType = {
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: "Admin" | "Seller" | "Customer";
        phone: string;
    };
} | null




export type UserType = {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image?: string | null | undefined;
        role: "Seller" | "Customer" | "Admin";
        phone: string;
    }






