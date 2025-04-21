/*
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  await connectMongoDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
}
*/
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (err) {
    console.error("Signup API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
