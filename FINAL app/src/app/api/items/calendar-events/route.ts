// Import the Next.js response helper
import { NextResponse } from "next/server";

// Import MongoDB connection utility
import connectMongoDB from "@/app/config/mongodb";

// Import the Checkout model for querying checkout data
import Checkout from "@/app/models/Checkout";

// Define the GET handler to retrieve and format checkout data as calendar events
export async function GET() {
  try {
    // Establish a connection to the MongoDB database
    await connectMongoDB();

    // Retrieve all checkout records from the database
    const checkouts = await Checkout.find({});

    // Format each checkout record into a calendar event object
    const events = checkouts.map((checkout: any) => ({
      title: `Headset ${checkout.headsetId} - User ${checkout.userId}`, // Event title includes headset and user ID
      start: checkout.checkoutDate, // Event start date is the checkout date
      end: checkout.returnBy || new Date(new Date().setDate(new Date().getDate() + 7)),  // Event end date is returnBy or 7 days from now by default
    }));

    // Return the formatted events as a JSON response with HTTP status 200 (OK)
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    // Log any error that occurs during data retrieval or formatting
    console.error("Failed to load calendar events:", error);

    // Return a JSON error response with HTTP status 500 (Internal Server Error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
