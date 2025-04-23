import { NextResponse } from "next/server";
import connectMongoDB from "@/app/config/mongodb";
import Checkout from "@/app/models/Checkout";

// Define the GET handler to retrieve and format checkout data as calendar events
export async function GET() {

  try {

    await connectMongoDB();
    const checkouts = await Checkout.find({});
    // Format each checkout record into a calendar event object
    const events = checkouts.map((checkout: any) => ({

      title: `Headset ${checkout.headsetId} - User ${checkout.userId}`, 
      start: checkout.checkoutDate, 
      end: checkout.returnBy || new Date(new Date().setDate(new Date().getDate() + 7)),

    }));


    return NextResponse.json(events, { status: 200 });
    // Return this if there is an error
  } catch (error) {

    console.error("Failed to load calendar events:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    
  }
}
