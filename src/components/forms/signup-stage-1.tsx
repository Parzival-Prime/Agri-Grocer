import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

interface SignupStage1Props {
  form: UseFormReturn<{
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    },
    any,
    {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    }>,

onSubmit: (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) => Promise<void>,

isPending: boolean,

signUpWithOAuth: (provider: string) => Promise<void>,

props: {}
}

export default function SignupStage1({ form, onSubmit, isPending, signUpWithOAuth, ...props }: SignupStage1Props) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
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
                  control={form.control}
                  name="password"
                  render={({ field }) => (
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
                  render={({ field }) => (
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
                  <Button type="submit" disabled={isPending}>
                    Proceed
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={() => signUpWithOAuth("google")}
                  >
                    Sign up with Google
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isPending}
                    onClick={() => signUpWithOAuth("github")}
                  >
                    Sign up with Github
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Already have an account? <a href="/auth/login">Sign in</a>
                  </FieldDescription>
                </Field>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
