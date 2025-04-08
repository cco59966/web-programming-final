import connectMongoDB from "@/app/config/mongodb";
import { Item } from "@/app/models/itemSchema";
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
    const { owner, title, description, url } = await request.json();
    await connectMongoDB();
    const item = await Item.findByIdAndUpdate(id, { owner, title, description, url }, { new: true });
    return NextResponse.json({ item }, { status: 200 });
}
export async function GET(request:NextRequest, {params}:RouteParams) {
    const {id} = await params;
    await connectMongoDB();
    const item = await Item.findOne({_id: id});
    return NextResponse.json({item}, {status: 200});
}
export async function DELETE(request: NextRequest, {params}: RouteParams) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
        return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}