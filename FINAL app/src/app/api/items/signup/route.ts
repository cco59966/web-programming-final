import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";
import jwt from "jsonwebtoken";

// POST request to create a new user account
// It checks if the user already exists, hashes the password, and creates a new user in the database
export async function POST(req: NextRequest) {
  
  try {


    const { name, email, password } = await req.json();
    await connectMongoDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return NextResponse.json({ message: "User already exists" }, { status: 400 });

    }

    // Uses bcrypt for the password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(

      { userId: newUser._id }, process.env.AUTH_SECRET!, { expiresIn: "1d" } 

    );

    // If success
    const response = NextResponse.json({

      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,

      },
    });

    response.cookies.set("token", token, {

      httpOnly: true,
      secure: process.env.NODE_ENV === "production", 
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, 

    });

    return response;

    // If it's a failure
  } catch (err) {

    console.error("Signup API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

  }
}
