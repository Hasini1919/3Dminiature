// routes/customers.js

import express from "express";
import Order from "../../models/Order.js";
import User from "../../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$userId",
          totalOrders: { $sum: 1 },
          firstOrder: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "users", // 👈 match your MongoDB collection name
          localField: "_id", // _id is userId
          foreignField: "_id", // make sure _id is ObjectId in user schema
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
          preserveNullAndEmptyArrays: true, // in case user is deleted
        },
      },
      {
        $project: {
          userId: "$_id",
          totalOrders: 1,
          name: {
            $cond: {
              if: { $ifNull: ["$userInfo.name", false] },
              then: "$userInfo.name",
              else: {
                $concat: [
                  "$firstOrder.address.FirstName",
                  " ",
                  "$firstOrder.address.LastName",
                ],
              },
            },
          },
          email: "$userInfo.email",
          phone: "$firstOrder.address.PhoneNumber",
          address: {
            $concat: [
              "$firstOrder.address.HouseNo", ", ",
              "$firstOrder.address.Area", ", ",
              "$firstOrder.address.City", ", ",
              "$firstOrder.address.District", ", ",
              "$firstOrder.address.Provience"
            ]
          }
        },
      },
    ]);

    res.json(customers);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

export default router;
