// Import database connection and required models
import connectMongoDB from "../../config/mongodb";
import mongoose from "mongoose";
import User from "../../models/User.js";
import Headset from "../../models/Headset.js";
import Checkout from "../../models/Checkout.js";
import Message from "../../models/Message.js";

// Import Next.js utilities for handling server requests and responses
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Define the POST endpoint to handle various operations based on 'type'
export async function POST(request: NextRequest) {
  try {
    // Extract the 'type' and 'data' fields from the incoming JSON body
    const { type, data } = await request.json();
    console.log("Request received: ", { type, data });
   
    
    // Connect to the MongoDB database
    await connectMongoDB();
    if (type === "message") {
      const { name, message } = data;

      const newMessage = await Message.create({ name, message });

      console.log("Message saved: ", newMessage);
      return NextResponse.json({
        message: "Message submitted successfully",
        data: newMessage,
      }, { status: 201 });
    }
    // ─────────────────────────────────────────────
    // TYPE: 'headset' – Add a new headset to the system
    // ─────────────────────────────────────────────
    if (type === "headset") {
      const { id, status, assignedTo, returnBy } = data;

      // Prevent duplicate headsets by checking for an existing one with the same ID
      const existing = await Headset.findOne({ id });
      if (existing) {
        return NextResponse.json({ error: "Headset with this ID already exists" }, { status: 400 });
      }

      // Create a new headset entry with default or provided values
      const newHeadset = new Headset({
        id,
        status: status || "available",
        assignedTo: assignedTo || null,
        lastCheckedOut: null,
        returnBy: returnBy || null,
      });

      await newHeadset.save();

      console.log("Headset created:", newHeadset);
      return NextResponse.json({
        message: "Headset added successfully",
        headset: newHeadset,
      }, { status: 201 });
    }

    // ─────────────────────────────────────────────
    // TYPE: 'user' – Create a new user account
    // ─────────────────────────────────────────────
    if (type === "user") {
      const { name, email, password, role } = data;

      // Create a new user with default role 'student' if not provided
      const newUser = new User({
        name,
        email,
        password,
        role: role || "student",
      });

      await newUser.save();

      console.log("User created: ", newUser);
      return NextResponse.json({
        message: "User created successfully",
        user: newUser,
      }, { status: 201 });
    }

    // ─────────────────────────────────────────────
    // TYPE: 'checkout' – Assign a headset to a user
    // ─────────────────────────────────────────────
    if (type === "checkout") {
      const { userId, returnBy, quantity } = data; 
    
      console.log("Bulk checkout request:", { userId, quantity });
    
      await connectMongoDB();
    
      let user;
      try {
        user = await User.findById(userId);
      } catch (err) {
        console.warn("Using fallback user");
        user = { _id: new mongoose.Types.ObjectId("67f68c137a5d74179328d274") };
      }
    
      if (!user) {
        user = { _id: new mongoose.Types.ObjectId("67f68c137a5d74179328d274") };
      }
    
      const returnDate = returnBy || new Date(new Date().setDate(new Date().getDate() + 7));
    
      const availableHeadsets = await Headset.find({ status: "available" }).limit(quantity);
    
      if (availableHeadsets.length < quantity) {
        return NextResponse.json({
          error: `Only ${availableHeadsets.length} headsets are available`,
        }, { status: 400 });
      }
    
      const checkouts = [];
    
      for (const headset of availableHeadsets) {
        const newCheckout = new Checkout({
          headsetId: headset.id,
          userId: user._id,
          returnBy: returnDate,
        });
    
        await newCheckout.save();
        checkouts.push(newCheckout);
    
        headset.status = "checked out";
        headset.assignedTo = user._id;
        headset.lastCheckedOut = new Date();
        headset.returnBy = returnDate;
        await headset.save();
      }
    
     
    
      return NextResponse.json({
        message: "Headsets checked out successfully",
        checkouts,
      }, { status: 200 });
    }
    
    

    // ─────────────────────────────────────────────
    // TYPE: 'return' – Return a headset
    // ─────────────────────────────────────────────
    if (type === "return") {
      const { headsetId } = data;
      console.log("Processing return for headsetId:", headsetId);

      // Find the headset by ID
      const headset = await Headset.findOne({ id: headsetId });
      if (!headset) {
        console.error("Headset not found:", headsetId);
        return NextResponse.json({ error: "Headset not found" }, { status: 404 });
      }

      // Reset the headset status and related fields
      headset.status = "available";
      headset.assignedTo = null;
      headset.lastCheckedOut = null;
      headset.returnBy = null;
      await headset.save();

      // Mark the checkout record as returned
      const checkoutRecord = await Checkout.findOne({ headsetId: headset.id });
      if (checkoutRecord) {
        checkoutRecord.returnedAt = new Date();
        await checkoutRecord.save();
      }

      console.log("Return successful: ", headset);
      return NextResponse.json({
        message: "Headset returned successfully",
        headset: headset,
      }, { status: 200 });
    }


    // ─────────────────────────────────────────────
    // TYPE: 'getCheckedOut' – Get all headsets checked out by a user
    // ─────────────────────────────────────────────
    if (type === "getCheckedOut") {
      const { userId } = data;

      if (!userId) {
        return NextResponse.json({ error: "Missing userId in request data" }, { status: 400 });
      }

      const checkedOutHeadsets = await Headset.find({ assignedTo: userId });

      console.log("Checked out headsets for user:", userId, checkedOutHeadsets);

      return NextResponse.json({
        message: "Checked out headsets fetched successfully",
        headsets: checkedOutHeadsets,
      }, { status: 200 });
    }



    // If no matching type was found, return a bad request
    return NextResponse.json({
      error: "Invalid type. Must be 'user', 'headset', 'checkout', or 'return'."
    }, { status: 400 });

  } catch (error) {
    // Catch any unexpected errors and return a 500 response
    console.error("Failed to process request:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
