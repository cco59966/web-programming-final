import connectMongoDB from "@/app/config/mongodb";
import User  from "@/app/models/User.js";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
interface RouteParams {
    params: {
        id: string;
    };
}
export async function PUT(request: NextRequest, {params}: RouteParams) {
    const { id } = await params;
    const { name, email, password, role } = await request.json();
    await connectMongoDB();
    const item = await User.findByIdAndUpdate(id, { name, email, password, role }, { new: true });
    return NextResponse.json({ item }, { status: 200 });
}
export async function GET(request:NextRequest, {params}:RouteParams) {
    const {id} = await params;
    await connectMongoDB();
    const item = await User.findOne({_id: id});
    return NextResponse.json({item}, {status: 200});
}
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedItem = await User.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}