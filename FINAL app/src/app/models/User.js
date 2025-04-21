import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student", "staff"],
      default: "student",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Users", 
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
