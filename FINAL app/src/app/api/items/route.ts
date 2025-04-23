import connectMongoDB from "../../config/mongodb";
import mongoose from "mongoose";
import User from "../../models/User.js";
import Headset from "../../models/Headset.js";
import Checkout from "../../models/Checkout.js";
import Message from "../../models/Message.js";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// Our POST request for most of the rest of our pages
// Changes based on "type"
export async function POST(request: NextRequest) {

  try {

    // Extract the 'type' and 'data' fields from the incoming JSON body
    const { type, data } = await request.json();
    console.log("Request received: ", { type, data });

    // Get token from cookie
    const token = request.cookies.get("token")?.value;
    console.log("Raw token from cookie:", token);


    // This gets the userID from the token it extracts
    let userIdFromToken: string | null = null;
    if (token) {
      
      try {

        const decoded: any = jwt.verify(token, process.env.AUTH_SECRET!);
        userIdFromToken = decoded.userId;
        console.log("Verified token userId:", userIdFromToken);
      } catch (err) {
        console.warn("Invalid token");
      }
    } else {
      console.warn("No token found in cookies");
    }
    
    await connectMongoDB();
   
    // If the user calls deleteMessage
    if (type === "deleteMessage") {
      const { messageId, userId } = data;
    
      const message = await Message.findById(messageId);
    
      // Make sure that the user can actually delete the emssage
      if (message.postedBy.toString() !== userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }
    
      // If so then delete the message
      await Message.findByIdAndDelete(messageId);
    
      return NextResponse.json({ message: "Message deleted" });
    }
    
    // If the user wants to post a message
    if (type === "message") {
      const { name, message, postedBy } = data;
    
      if (!postedBy) {
        return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
      }
    
      // Add a name and message
      const newMessage = await Message.create({ name, message, postedBy,
      });
    
      return NextResponse.json({
        message: "Message submitted successfully",
        data: newMessage,
      }, { status: 201 });
    }
    
    // This was for when we were adding headsets, kind of useless now
    // unless we want to add more
    if (type === "headset") {
      const { id, status, assignedTo, returnBy } = data;

      // Prevent duplicate headsets by checking for an existing one with the same ID
      const existing = await Headset.findOne({ id });
      if (existing) {
        return NextResponse.json({ error: "Headset with this ID already exists" }, { status: 400 });
      }

// Make a new headset
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


    // This is for when we were manually creating users, mostly with postman
    if (type === "user") {
      const { name, email, password, role } = data;

      // Create a new user with default role 'student' if not provided
      // We ditched this concept kind of, but it's still here for now
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

    // This is for when the user calls checkout
    if (type === "checkout") {
      const { returnBy, quantity } = data;
      const userId = userIdFromToken;

      // This was very helpful for testing purposes
      console.log("Bulk checkout request (verified):", { userId, quantity });
      
      // So was this, we could remove it but not now
      if (!userId) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
      }
      
      await connectMongoDB();
      
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      // Sets a default return date if they don't pick one
      const returnDate = returnBy || new Date(new Date().setDate(new Date().getDate() + 7));
    
      // This portion checks and sees if there are enough headsets available
      const availableHeadsets = await Headset.find({ status: "available" }).limit(quantity);
    
      if (availableHeadsets.length < quantity) {
        return NextResponse.json({
          error: `Only ${availableHeadsets.length} headsets are available`,
        }, { status: 400 });
      }
    
      const checkouts = [];
    
      // Sets a checkout for each headset that is available
      for (const headset of availableHeadsets) {
        const newCheckout = new Checkout({
          headsetId: headset.id,
          userId: user._id,
          returnBy: returnDate,
        });
    
        await newCheckout.save();
        checkouts.push(newCheckout);
    

        // Updates the headset with the checked out status
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
    
    
// If the user wants to return a headset
    if (type === "return") {
      const { headsetId } = data;
      console.log("Processing return for headsetId:", headsetId);

    
      const headset = await Headset.findOne({ id: headsetId });

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


 // If the user wants to see all of their checked out headsets
    if (type === "getCheckedOut") {
      const { userId } = data;


      // Useless for testing purposes
      if (!userId) {
        return NextResponse.json({ error: "Missing userId in request data" }, { status: 400 });
      }


      // Find the headsets that the users has checked out
      const checkedOutHeadsets = await Headset.find({ assignedTo: userId });

      console.log("Checked out headsets for user:", userId, checkedOutHeadsets);

      return NextResponse.json({

        message: "Checked out headsets fetched successfully",
        headsets: checkedOutHeadsets,
      }, { status: 200 });
    }

   // After everything, checks to make sure that the type is right
    return NextResponse.json({
      error: "Invalid type. Must be 'user', 'headset', 'checkout', or 'return'."
    }, { status: 400 });

  } catch (error) {


    // Catch any unexpected errors and return a 500 response
    console.error("Failed to process request:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });

  }

  
}

// This is only for the messages page, but it gets the messages and shows them to the users
export async function GET(request: NextRequest) {
  try {

    await connectMongoDB();
    const messages = await Message.find({});
    return NextResponse.json({ messages }, { status: 200 });

  } catch (error) {

    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });

  }
}