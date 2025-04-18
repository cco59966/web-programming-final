import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    message: { type: String, required: true},
  },
  {
    collection: "Messages", 
  }
);

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);