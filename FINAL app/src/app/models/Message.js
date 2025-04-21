import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});



export default mongoose.models.Message || mongoose.model("Message", MessageSchema);