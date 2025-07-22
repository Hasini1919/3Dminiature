import express from "express";
import Coupon from "../../../models/Coupon.js";

const router = express.Router();

// Create new coupon (admin only)
router.post("/create", async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
