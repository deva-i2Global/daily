import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const text = await req.json();

    console.log(text);
    
     
    const res = NextResponse.json({
      success: true,
      data: "Token Stored",
    });
 
    return res;
  } catch (error) {
    console.error("POST /api/meeting error:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}