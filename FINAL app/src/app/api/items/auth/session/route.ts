import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Get request that fetch user information from the token in cookies
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // verify the token using the secret key
    const decoded: any = jwt.verify(token, process.env.AUTH_SECRET!);

    // if successful, return the user information
    return NextResponse.json({
      user: {
        userId: decoded.userId,
        name: decoded.name,
      },
    }, { status: 200 });
  } catch (err) {
    // if invalid
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
