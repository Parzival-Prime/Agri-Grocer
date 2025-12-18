import ProfileDisplay from "@/components/profile-display";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="px-8 py-3 container mx-auto">
      <h1 className="font-bold text-3xl my-7">Dashboard</h1>
      <ProfileDisplay initialSession={session} />
    </div>
  );
}
