"use client"

import { GetSessionType } from '@/types/auth.types'
import SignOutButton from "@/components/signOutButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export default function ProfileDisplay({initialSession}: {initialSession: GetSessionType}) {
  const [session, setSession] = useState(initialSession);
  const [loading, setLoading] = useState(!initialSession);

  if (loading) return <p>Loading session...</p>;
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
          </div>
          <h2 className="text-lime-500 text-3xl mt-5">Active Session</h2>
          <pre className="px-5 py-6 text-sm overflow-clip">
            {JSON.stringify(session, null, 2)}
          </pre>
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
  )
}


