import connectMongoDB from "../../config/mongodb";
import User from "../../models/User.js";
import Headset from "../../models/Headset.js";
import Checkout from "../../models/Checkout.js";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json();
    console.log("Request received: ", { type, data });
    await connectMongoDB();

    // Handling 'user' type (create a new user)
    if (type === "user") {
      const { name, email, password, role } = data;
      const newUser = new User({
        name,
        email,
        password,
        role: role || "student",  // Default role to 'student' if not provided
      });
      await newUser.save();
      console.log("User created: ", newUser);
      return NextResponse.json({
        message: "User created successfully",
        user: newUser,
      }, { status: 201 });
    }

    // Handling 'checkout' type (checking out a headset)
    if (type === "checkout") {
      const { headsetId, userId, returnBy } = data;
      console.log("Processing checkout for headsetId:", headsetId, "and userId:", userId);

      // Find the headset and user by their IDs
      const headset = await Headset.findOne({ id: headsetId });
      const user = await User.findById(userId);

      if (!headset) {
        console.error("Headset not found:", headsetId);
        return NextResponse.json({ error: "Headset not found" }, { status: 404 });
      }

      if (!user) {
        console.error("User not found:", userId);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (headset.status === "checked out") {
        console.error("Headset already checked out:", headsetId);
        return NextResponse.json({ error: "Headset is already checked out" }, { status: 400 });
      }

      // If the "returnBy" is not provided, set it to 7 days from today
      const returnDate = returnBy || new Date(new Date().setDate(new Date().getDate() + 7));

      // Create a new checkout record
      const newCheckout = new Checkout({
        headsetId: headset.id,
        userId: user._id,
        returnBy: returnDate,  // Store the return by date in the checkout record
      });

      // Save the checkout record
      await newCheckout.save();

      // Update headset status, assign it to the user, and set the returnBy date
      headset.status = "checked out";
      headset.assignedTo = user._id;
      headset.lastCheckedOut = new Date();
      headset.returnBy = returnDate;  // Set the return by date in the headset document
      await headset.save();

      console.log("Checkout successful: ", newCheckout);
      return NextResponse.json({
        message: "Headset checked out successfully",
        checkout: newCheckout,
      }, { status: 200 });
    }

    // Handling 'return' type (returning a headset)
    if (type === "return") {
      const { headsetId } = data;
      console.log("Processing return for headsetId:", headsetId);

      // Find the headset by its ID
      const headset = await Headset.findOne({ id: headsetId });
      if (!headset) {
        console.error("Headset not found:", headsetId);
        return NextResponse.json({ error: "Headset not found" }, { status: 404 });
      }

      // If the headset is not checked out, return an error
      if (headset.status !== "checked out") {
        console.error("Headset is not checked out:", headsetId);
        return NextResponse.json({ error: "Headset is not currently checked out" }, { status: 400 });
      }

      // Update the headset to "available" status and clear the assignedTo and returnBy fields
      headset.status = "available";
      headset.assignedTo = null;
      headset.lastCheckedOut = null;
      headset.returnBy = null;  // Clear returnBy date as the headset is being returned

      // Save the updated headset
      await headset.save();

      // Find and remove the corresponding checkout record
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

    return NextResponse.json({
      error: "Invalid type. Must be 'user', 'headset', 'checkout', or 'return'."
    }, { status: 400 });

  } catch (error) {
    console.error("Failed to process request:", error);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }

}
