import express from "express";
import RefundRequest from "../../models/Admin_models/Refund.js";
import Order from "../../models/Order.js";
import { getAllRefunds } from "../../controllers/admin_controller/refund_cont.js";
const router = express.Router();

// Get all refund requests
router.get("/", async (req, res) => {
  try {
    const refunds = await RefundRequest.find().sort({ createdAt: -1 });
    res.status(200).json(refunds);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch refund requests", error: err });
  }
});

// Update refund status
router.patch("/:id", async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["Pending", "Accepted", "Rejected", "Completed"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid refund status" });
  }

  try {
    const updated = await RefundRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Refund request not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update refund status", error: err });
  }
});

// router.get("/api/refunds", getAllRefunds);


export default router;
