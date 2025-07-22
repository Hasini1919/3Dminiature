// import express from "express";
// import Coupon from "../../../models/Coupon.js";

// const router = express.Router();

// // Create new coupon
// router.post("/create", async (req, res) => {
//   try {
//     const coupon = new Coupon(req.body);
//     await coupon.save();
//     res.status(201).json({ message: "Coupon created", coupon });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all coupons
// router.get("/", async (req, res) => {
//   try {
//     const coupons = await Coupon.find();
//     res.json(coupons);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Validate coupon
// router.post("/validate", async (req, res) => {
//   const { code, totalAmount } = req.body;
//   try {
//     const coupon = await Coupon.findOne({ code });

//     if (!coupon) return res.status(404).json({ error: "Invalid coupon code" });

//     const now = new Date();
//     if (now < coupon.validFrom || now > coupon.validTo)
//       return res.status(400).json({ error: "Coupon not valid at this time" });

//     if (!coupon.active) return res.status(400).json({ error: "Coupon is inactive" });

//     if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses)
//       return res.status(400).json({ error: "Coupon usage limit reached" });

//     if (totalAmount < coupon.minPurchaseAmount)
//       return res.status(400).json({ error: `Minimum purchase is ₹${coupon.minPurchaseAmount}` });

//     res.json({ success: true, coupon });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
