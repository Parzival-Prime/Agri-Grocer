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
import { SignupStage1Props } from "@/types/auth.types";

export default function SignupStage1({
  form,
  nextStage,
  isPending,
  ...props
}: SignupStage1Props) {
  function handleClick(e: React.MouseEvent){
    e.preventDefault()
    console.log("clicked")
    nextStage("stage-1", "stage-2")
  }
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
                // onSubmit={form.handleSubmit(() => {
                //     nextStage("stage-2");
                // })}
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

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 000 000 0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  <Button disabled={isPending} onClick={handleClick}>
                    Proceed
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

{
  /* <Button
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
                  </Button> */
}
