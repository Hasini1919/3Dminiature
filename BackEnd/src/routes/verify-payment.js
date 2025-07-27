// routes/checkout/verify-payment.js
import Stripe from "stripe";
import OrderModel from "../models/Order.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js"
import { sendOrderConfirmationEmail } from "../utils/mailer.js";
import express from "express";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

router.post("/verify-payment", async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID not found in session." });
    }

    // 1. Update order to Paid
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      {
        payment: true,
        status: "Order Placed",
      },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const userId = updatedOrder.userId;
    const address = updatedOrder.address;

    // 2. Clear cart if not buyNow
    if (!updatedOrder.buyNow) {
      await User.findByIdAndUpdate(userId, { cartData: [] });
    }

    //  3. Update user: address, coupon usage
    const user = await User.findById(userId);

    if (user) {
      //  Update address
      user.address = address;

      // Apply coupon if used
      if (user?.appliedCoupon?.code) {
        const couponDoc = await Coupon.findOne({ code: user.appliedCoupon.code });

        if (couponDoc && !user.usedCoupons.includes(couponDoc._id)) {
          user.usedCoupons.push(couponDoc._id);
          user.appliedCoupon = null;
        }
      }

      await user.save();

      // 4. Send confirmation email
      if (user.email) {
        const orderDetails = {
          amount: updatedOrder.amount,
          items: updatedOrder.items,
          paymentMethod: updatedOrder.paymentMethod,
          orderNumber: updatedOrder.orderNumber,
        };

        await sendOrderConfirmationEmail(user.email, orderDetails);
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error verifying Stripe session:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
