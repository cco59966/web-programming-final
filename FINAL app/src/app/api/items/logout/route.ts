import { NextResponse } from "next/server";

export async function POST() {
<<<<<<< HEAD
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("token", "", { maxAge: 0 });
  return response;
=======
  const res = NextResponse.json({ message: "Logged out successfully" });
  res.cookies.set("token", "", { path: "/", maxAge: 0 }); 
  return res;
>>>>>>> 4fef5a9935b42bb530bc2a4f19513f423f2c2b97
}
