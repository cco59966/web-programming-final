import mongoose from "mongoose";

// Our scheme for the actual headsets, takes in id, status, assignedTo, lastCheckedOut, and returnBy date
const headsetSchema = new mongoose.Schema({
  id: { type: String, required: true },
  status: { type: String, enum: ["available", "checked out"], default: "available" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  lastCheckedOut: { type: Date, default: null },
  returnBy: { type: Date, default: null }, 
});
export default mongoose.models.Headset || mongoose.model("Headset", headsetSchema);