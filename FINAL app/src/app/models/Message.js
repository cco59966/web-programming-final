import mongoose from "mongoose";

// Our schema for the messages, takes in name, message, and postedBy userId
const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);