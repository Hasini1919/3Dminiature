import express from "express";
import Order from "../../../models/Order.js";

const router = express.Router();

// StatusName  
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

//  - update order status
router.put("/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 
  try {
    await Order.findByIdAndUpdate(id, { status });
      
    res.json({ message: "Order status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

//  fetch orders by userId (customer)
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to get orders" });
  }
});


//payment
router.put("/:id/payment", async (req, res) => {
  const { id } = req.params;
  const { payment } = req.body;
  await Order.findByIdAndUpdate(id, { payment });
  res.status(200).json({ success: true });
});


export default router;
