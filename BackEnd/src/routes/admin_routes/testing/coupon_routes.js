import express from "express";
import Coupon from "../../../models/Coupon.js";
import Notification from "../../../models/Admin_models/Notification.js";

const router = express.Router();

// GET all coupons
router.get("/", async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

// GET single coupon by ID
router.get("/:id", async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (!coupon) return res.status(404).json({ message: "Coupon not found" });
  await Notification.create({
    type: "coupon",
    message: `Coupon code ${coupon.code} is now updated.`,
  });
  res.json(coupon);
});

// PUT update coupon
router.put("/:id", async (req, res) => {
  const updated = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE coupon
router.delete("/:id", async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  await Notification.create({
    type: "coupon",
    message: `Coupon code ${Coupon.code} is now deleted.`,
  });
  res.json({ success: true });
});

export default router;
