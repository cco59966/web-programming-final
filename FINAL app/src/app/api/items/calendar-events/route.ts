import { NextResponse } from "next/server";
import connectMongoDB from "@/app/config/mongodb";
import Checkout from "@/app/models/Checkout";

export async function GET() {
  try {
    await connectMongoDB();

    const checkouts = await Checkout.find({});

    const events = checkouts.map((checkout: any) => ({
      title: `Headset ${checkout.headsetId} - User ${checkout.userId}`,
      start: checkout.checkoutDate,
      end: checkout.returnBy || new Date(new Date().setDate(new Date().getDate() + 7)),  // Default to 7 days if no return date
    }));

    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Failed to load calendar events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
