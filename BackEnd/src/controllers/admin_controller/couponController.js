// import Coupon from "../../models/Admin_models/Coupon.js";

// export const addCoupon = async (req, res) => {
//   try {
//     const { code, type, value, minOrderAmount, productId, expiresAt } = req.body;

//     if (!code || !type || value === undefined || !expiresAt) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     // Check for existing coupon code
//     const existing = await Coupon.findOne({ code });
//     if (existing) {
//       return res.status(400).json({ message: "Coupon code already exists" });
//     }

//     const coupon = new Coupon({
//       code,
//       type,
//       value,
//       minOrderAmount: minOrderAmount || 0,
//       productId: productId || null,
//       expiresAt: new Date(expiresAt),
//     });

//     await coupon.save();

//     res.status(201).json({ message: "Coupon added successfully", coupon });
//   } catch (error) {
//     console.error("Add coupon error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
