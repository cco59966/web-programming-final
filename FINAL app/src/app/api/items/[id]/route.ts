// Importing necessary modules and configurations
import connectMongoDB from "@/app/config/mongodb"; // Function to establish MongoDB connection
import User from "@/app/models/User.js"; // Mongoose User model
import { NextResponse } from "next/server"; // For returning API responses
import { NextRequest } from "next/server"; // Type for incoming requests
import mongoose from "mongoose"; // Mongoose library for MongoDB interactions

// Define route parameter structure expected in the request
interface RouteParams {
    params: {
        id: string;
    };
}

// Handle PUT request to update a user document by ID
export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = params; // Extract user ID from route parameters
    const { name, email, password, role } = await request.json(); // Parse request body for user data

    await connectMongoDB(); // Ensure database connection is established

    // Find the user by ID and update with new data, returning the updated document
    const item = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });

    // Respond with the updated user item
    return NextResponse.json({ item }, { status: 200 });
}

// Handle GET request to retrieve a user document by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params; // Extract user ID from route parameters

    await connectMongoDB(); // Ensure database connection is established

    // Find the user document by its ID
    const item = await User.findOne({ _id: id });

    // Respond with the found user item
    return NextResponse.json({ item }, { status: 200 });
}

// Handle DELETE request to remove a user document by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = params; // Extract user ID from route parameters

    // Validate that the ID is a proper MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB(); // Ensure database connection is established

    // Attempt to delete the user by ID
    const deletedItem = await User.findByIdAndDelete(id);

    // If no user was found to delete, respond with 404
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Respond with success message
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
