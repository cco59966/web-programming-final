import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["student", "staff", "admin"],
      default: "student",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "Users", // 👈 Force this schema to use the 'Users' collection
  }
);

// 👇 Use `mongoose.models` to avoid OverwriteModelError
export default mongoose.models.User || mongoose.model("User", UserSchema);
