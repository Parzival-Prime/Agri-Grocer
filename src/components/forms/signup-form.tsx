"use client"

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
  FieldDescription
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";




const formSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});


export function SignupForm({ ...props }: React.ComponentProps<"div">) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>){
    try {
      if(values.password !== values.confirmPassword){
        toast.error("Password and ConfirmPassword didn't match. Please try again.")
        return
      }

      await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
    },{
      onRequest: ()=>setIsPending(true),
      onResponse: ()=>setIsPending(false),
      onError: (ctx)=>{
        toast.error(ctx.error.message)
      },
      onSuccess: ()=>{
        router.push("/auth/login")
        toast.success("User registered Successfully!")
      }
    })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
              <FormField
              control={form.control}
              name="name"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
                
              <FormField
              control={form.control}
              name="email"
              render={({field})=>(
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
              control={form.control}
              name="password"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField
              control={form.control}
              name="confirmPassword"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
                <Field>
                  <Button type="submit" disabled={isPending}>Create Account</Button>
                  <Button variant="outline" type="button" disabled={isPending}>
                    Sign up with Google
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <a href="/auth/login">Sign in</a>
                  </FieldDescription>
                </Field>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
