import { redirect } from "next/navigation";

export async function GET(){
    try {
        console.log("verification route.")
        return redirect("/auth/login")
    } catch (error) {
        console.log(error)
    }
}