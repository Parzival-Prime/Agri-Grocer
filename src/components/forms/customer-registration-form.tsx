"use client";

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
import { useState } from "react";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DatePicker from "@/components/date-picker";
import { SignupStage3Props } from "@/types/auth.types";

export default function CustomerRegistration({
  form,
  nextStage,
  isPending,
}: SignupStage3Props) {
  // const [date, setDate] = useState<Date | undefined>(new Date("2025-06-01"))
  // const [isPending, setIsPending] = useState(false)

  // const handleSetDate = (date: Date | undefined)=>{
  //   setDate(date)
  // }

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    // console.log("clicked")
    nextStage("stage-3", "stage-3");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Create a Customer account</CardTitle>
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
                {/* <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Of Birth</FormLabel>
                          <FormControl>
                            <DatePicker date={date} setDate={handleSetDate} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
     */}
                <FormField
                  control={form.control}
                  name="customerProfile.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Field>
                  <Button
                    type="submit"
                    disabled={isPending || form.watch("role") !== "Customer"}
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
