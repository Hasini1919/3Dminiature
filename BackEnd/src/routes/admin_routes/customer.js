// routes/customers.js

import express from "express";
import Order from "../../models/Order.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Aggregate unique customers by userId with their address from first order
    const customers = await Order.aggregate([
        {
          $group: {
            _id: "$userId",
            totalOrders: { $sum: 1 },          
            firstOrder: { $first: "$$ROOT" }   
          }
        },
        {
          $project: {
            userId: "$_id",
            address: "$firstOrder.address",
            totalOrders: 1                    
          }
        }
      ]);

    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

export default router;
