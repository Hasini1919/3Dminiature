import RefundRequest from "../../models/Admin_models/Refund.js";

export const getAllRefunds = async (req, res) => {
  try {
    const refunds = await RefundRequest.find().sort({ createdAt: -1 });
    res.status(200).json(refunds);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch refunds", error });
  }
};
