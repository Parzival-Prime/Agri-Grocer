import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function page() {

  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className="px-8 py-3 container mx-auto">
      <h1 className="font-bold text-3xl my-7">Dashboard</h1>

      {session ? (
        <>
          <SignOutButton />
          <h2 className="text-lime-500 text-3xl mt-5">Active Session</h2>
          <pre className="px-5 py-6 text-sm overflow-clip">{JSON.stringify(session, null, 2)}</pre>
        </>
      ) : (
        <>
          <div className="px-8 py-16 space-x-7">
            <Button size="sm" asChild>
              <Link href={"/auth/signup"}>SignUp</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={"/auth/login"}>SignIn</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={"/seller/dashboard"}>Seller Dashboard</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={"/products"}>All Products</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
