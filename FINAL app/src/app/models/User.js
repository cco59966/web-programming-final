import mongoose from "mongoose";

// Our schema for the users, takes in name, email, password, role, and createdAt date
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
  // Added this because we were having problems with it going to the wrong space
  {
    collection: "Users", 
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
