import mongoose from "mongoose";

const RefundRequestSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  requestDate: { type: Date, required: true },
  productName: { type: String, required: true },
  orderNum: { type: String, required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Orders", required: true }, // added
  refundReason: { type: String, required: true },
  invoice: { type: String, enum: ["yes", "no"], required: true },
  readPolicy: { type: String, enum: ["yes", "no"], required: true },
  eligible: { type: String, enum: ["yes", "no"], required: true },
  requestedAmount: { type: Number, required: true },
  notes: { type: String },
  agreed: { type: Boolean, required: true },
  status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Completed"], default: "Pending" }, // added
}, { timestamps: true });

export default mongoose.models.RefundRequest || mongoose.model("RefundRequest", RefundRequestSchema);
