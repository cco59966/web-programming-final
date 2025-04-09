import mongoose from "mongoose";

const CheckoutSchema = new mongoose.Schema(
  {
    headsetId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkoutDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 👇 Use `mongoose.models` to avoid OverwriteModelError

export default mongoose.models.Checkout || mongoose.model("Checkout", CheckoutSchema);
