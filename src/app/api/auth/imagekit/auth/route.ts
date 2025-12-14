import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // console.log("Inside /api/auth/imagekit/auth")
    const {token, signature, expire} = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
    });

    return NextResponse.json({
      token, signature, expire,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    return NextResponse.json({
        error: "Authentication for Imagekit failed"
    }, {status: 400})
  }
}
