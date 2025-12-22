"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  const [user, setUser] = useState<null | any>(null);
  const [session, setSession] = useState<null | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          setUser(null);
          setSession(null);
        } else {
          setUser(data.user);
          setSession(data.session);
        }
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading session...</p>;

  // if (!data) return <UnauthenticatedUI />

  // if (data.user.role === "SELLER") return <SellerUI />
  // if (data.user.role === "CUSTOMER") return <CustomerUI />

  return (
    <div>
      {session ? (
        <>
          <div className="px-8 py-16 space-x-7">
            <Button size="sm" asChild>
              <Link href={"/products"}>All Products</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={"/seller/dashboard"}>Seller Dashboard</Link>
            </Button>
            <SignOutButton />
            <div className="ml-8">
              <h2 className="text-lime-500 text-3xl mt-5">Active Session</h2>
              <pre className="px-5 py-6 text-sm overflow-clip">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>
          </div>
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
              <Link href={"/products"}>All Products</Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
