import mongoose from "mongoose";

// Our scheme for the checkout system, takes in headsetId, userId, checkoutDate, and returnBy date
const CheckoutSchema = new mongoose.Schema({
    headsetId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkoutDate: { type: Date, default: Date.now },
    returnBy: {type: Date },
  },
  { timestamps: true });

export default mongoose.models.Checkout || mongoose.model("Checkout", CheckoutSchema);
