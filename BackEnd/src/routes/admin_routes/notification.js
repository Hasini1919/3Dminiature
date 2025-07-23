// BACKEND (Node.js + Express)
// File: routes/notifications.js

import express from "express";
import Notification from "../../models/Admin_models/Notification.js";
import Order from "../../models/Order.js";

const router = express.Router();

// Get all notifications
router.get("/", async (req, res) => {
  try {
    const notifs = await Notification.find().sort({ createdAt: -1 });
    res.json(notifs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Mark as read
router.post("/:id/read", async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Fetch related info (e.g., order details)
router.get("/related/:id", async (req, res) => {
  try {
    const notif = await Notification.findById(req.params.id);
    if (notif.type === "ORDER_PLACED") {
      const order = await Order.findById(notif.relatedId);
      return res.json({ type: "ORDER_PLACED", info: order });
    }
    res.status(404).json({ error: "Unknown notification type" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;