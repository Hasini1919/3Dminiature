import express from "express";
import Order from "../../../models/Order.js";

const router = express.Router();

// GET /api/orders?status=StatusName  - fetch orders filtered by status or all if no status or "All"
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    const filter = {};
    if (status && status !== "All") {
      filter.status = status;
    }

    const orders = await Order.find(filter).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// PUT /api/orders/:id/status  - update order status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // expects { status: "newStatus" }
  try {
    await Order.findByIdAndUpdate(id, { status });
    res.json({ message: "Order status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

// GET /api/orders/user/:userId - fetch orders by userId (customer)
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders" });
  }
});

export default router;
