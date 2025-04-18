import mongoose from "mongoose";

const headsetSchema = new mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, enum: ["available", "checked out"], default: "available" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  lastCheckedOut: { type: Date, default: null },
  returnBy: { type: Date, default: null }, // Add this field for return date
});
export default mongoose.models.Headset || mongoose.model("Headset", headsetSchema);