import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
  return (
    <div className="px-8 py-3 container mx-auto">
      <h1 className="font-bold text-3xl my-7">Seller Dashboard</h1>

      {/* {session ? (
        <>
          <SignOutButton />
          <h2 className="text-lime-500 text-3xl mt-5">Active Session</h2>
          <pre className="px-5 py-6 text-sm overflow-clip">{JSON.stringify(session, null, 2)}</pre>
        </>
      ) : (
        <> */}
          <div className="px-8 py-16 space-x-7">
            <Button size="sm" asChild>
              <Link href={"/seller/create-product"}>Create Product</Link>
            </Button>
          </div>
        {/* </>
      )} */}
    </div>
  )
}

