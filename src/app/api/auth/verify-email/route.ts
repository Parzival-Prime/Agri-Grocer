import { redirect } from "next/navigation";

export async function GET(){
    try {
        redirect("/auth/login")
    } catch (error) {
        console.log(error)
    }
}