// pages/api/return-refund.js (or /api/return-refund.ts)
import connectDB from "../config/db"; // Your db connection helper
import RefundRequest from "@/models/RefundRequest";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const data = req.body;

      // Basic validation can be here, or rely on Mongoose validation
      const refundRequest = new RefundRequest(data);
      await refundRequest.save();

      return res.status(201).json({ message: "Refund request submitted", refundRequest });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    // Optional: Fetch refund requests by email or id to show status to customer
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email query parameter required" });

    try {
      const requests = await RefundRequest.find({ email }).sort({ createdAt: -1 });
      return res.status(200).json({ requests });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
