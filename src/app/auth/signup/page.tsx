import FullSignupForm from "@/components/forms/full-signup-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function SignUp() {
  const session = await auth.api.getSession({headers: await headers()})
  return (
    <FullSignupForm session={session} />
  )
}