/*
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "warnell-vr-secret";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectMongoDB();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("token", token, { httpOnly: true, secure: true });

  return res;
}
*/
// /app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "warnell-vr-secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    await connectMongoDB();

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Incorrect email or password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });

    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("token", token, { httpOnly: true, secure: true });

    return res;
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
