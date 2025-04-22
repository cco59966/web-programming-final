import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    const decoded: any = jwt.verify(token, process.env.AUTH_SECRET!);

    return NextResponse.json({
      user: {
        userId: decoded.userId,
        name: decoded.name,
      },
    }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
