import RefundRequest from "../models/refundform.js";
import connectDB from "../config/db.js";

await connectDB(); // run once if not in middleware

export const createRefundRequest = async (req, res) => {
  try {
    const data = req.body;
    const refundRequest = new RefundRequest(data);
    await refundRequest.save();
    res.status(201).json({ message: "Refund request submitted", refundRequest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
