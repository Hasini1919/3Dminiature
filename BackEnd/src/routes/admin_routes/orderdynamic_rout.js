// routes/admin_routes/orderdynamic_route.js
import express from "express";
import Order from "../../models/Order.js";
import path from "path";

const router = express.Router();

// GET order by ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return order document as JSON
    res.json(order);
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
