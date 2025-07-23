import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percentage", "flat"], required: true },
  value: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: null },
  expiresAt: { type: Date, required: true },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;
