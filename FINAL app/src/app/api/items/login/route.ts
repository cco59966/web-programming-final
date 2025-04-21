import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

const AUTH_SECRET = process.env.AUTH_SECRET || "warnell-vr-secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Incorrect email or password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, AUTH_SECRET, { expiresIn: "1d" });

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    
    res.cookies.set("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    
    return res;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
