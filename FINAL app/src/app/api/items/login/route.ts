import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../config/mongodb";
import User from "../../../models/User.js";

const AUTH_SECRET = process.env.AUTH_SECRET || "warnell-vr-secret";

// Post request to create a new user session and log them in
export async function POST(req: NextRequest) {
  
  try {

    const { email, password } = await req.json();
    await connectMongoDB();

    // Read their dada and see it it matches a user in the database
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: "Incorrect email or password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, AUTH_SECRET, { expiresIn: "1d" });

    // If the response is successful, set the token in the cookies and return the user data
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
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, 
    });
    
    return res;

    // Return this if there is an error
  } catch (err) {
    console.error("Login API error:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
