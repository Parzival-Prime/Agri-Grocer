"use client"

import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter()


  async function signOutFunction() {
    try {
      setIsPending(true);
      const res = await signOut();
      if (!res.error) {
        toast.success("User Logged Out Successfully!");
      }
    } catch (error) {
      console.log(error);
    }
    setIsPending(false);
    router.refresh()
  }
  return (
    <Button size="sm" onClick={signOutFunction} className="mb-3 bg-red-900 text-white" disabled={isPending}>
      SignOut
    </Button>
  );
}

