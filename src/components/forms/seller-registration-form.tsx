import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SignupStage3Props } from "@/types/auth.types";


export default function SellerRegistration({form, nextStage, isPending }: SignupStage3Props) {
  function handleClick(e: React.MouseEvent){
    e.preventDefault()
    // console.log("clicked")
    nextStage("stage-3", "stage-3")
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create a Seller account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>            
            <Form {...form}>
              <form
                // onSubmit={form.handleSubmit()}
                className="space-y-7"
              >

                <FormField
                  control={form.control}
                  name="sellerProfile.storeName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="your Store's Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  <Button type="submit" disabled={isPending || form.watch("role") !== "Seller"}
                  onClick={handleClick}
                  >
                    Register
                  </Button>
                </Field>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
