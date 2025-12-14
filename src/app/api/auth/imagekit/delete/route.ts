import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { fileId } = await request.json();

    if (!fileId) {
      return NextResponse.json({ error: "fileId is required" }, { status: 400 });
    }

    // Use ImageKit private key directly (server-side only)
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY!;
    if (!privateKey) {
      return NextResponse.json({ error: "ImageKit private key not configured" }, { status: 500 });
    }

    // Official ImageKit Delete API
    const response = await fetch(`https://api.imagekit.io/v1/files/${fileId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Basic ${Buffer.from(privateKey + ":").toString("base64")}`,
      },
    });

    // console.log("response: ", response)

    if (response.ok) {
      return NextResponse.json({ 
        success: true, 
        message: "File deleted successfully" 
      });
    } else {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error || "Delete failed" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
