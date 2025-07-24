import express from "express";
import Coupon from "../../../models/Coupon.js";
import Notification from "../../../models/Admin_models/Notification.js";

const router = express.Router();

// Create new coupon (admin only)
router.post("/create", async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    await Notification.create({
      type: "coupon",
      message: `Coupon code ${Coupon.code} is now created.`,
    });
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
