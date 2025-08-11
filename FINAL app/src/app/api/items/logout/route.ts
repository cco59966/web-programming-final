import { NextResponse } from "next/server";

// All this does is log the user out by clearing the token cookie
export async function POST() {

  const res = NextResponse.json({ message: "Logged out successfully" });
  res.cookies.set("token", "", { path: "/", maxAge: 0 }); 
  return res;
  
}
