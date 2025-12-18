import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        return NextResponse.json({
            success: true,
            message: "Route not implemented yet."
        })
    } catch (error) {
        console.log(error)
    }
}