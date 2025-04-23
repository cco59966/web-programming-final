import connectMongoDB from "@/app/config/mongodb"; 
import User from "@/app/models/User.js"; 
import { NextResponse } from "next/server"; 
import { NextRequest } from "next/server";
import mongoose from "mongoose"; 

// Define route parameter structure expected in the request
interface RouteParams {
    params: {
        id: string;
    };
}

// Handle PUT request to update a user document by ID
export async function PUT(request: NextRequest, { params }: RouteParams) {
    
    const { id } = params; 
    const { name, email, password, role } = await request.json(); 
    
    await connectMongoDB();

    // Find the user by ID and update with new data, returning the updated document
    const item = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });

    // Respond with the updated user item
    return NextResponse.json({ item }, { status: 200 });
}

// Handle GET request to retrieve a user document by ID
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params; 

    await connectMongoDB(); 

    // Find the user document by its ID
    const item = await User.findOne({ _id: id });

    // Respond with the found user item
    return NextResponse.json({ item }, { status: 200 });
}

// Handle DELETE request to remove a user document by ID
export async function DELETE(request: NextRequest, { params }: RouteParams) {

    const { id } = params; 

    // Validate that the ID is a proper MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    await connectMongoDB();

    // Attempt to delete the user by ID
    const deletedItem = await User.findByIdAndDelete(id);

    // If no user was found to delete, respond with 404
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Respond with success message
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
