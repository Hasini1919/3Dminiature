// routes/orderRoutes.js (or wherever your Express routes are)
import express from "express";
import Order from "../../models/Order.js";
import User from "../../models/User.js";
import Notification from "../../models/Admin_models/Notification.js";

const router = express.Router();

router.get("/api/orders/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findById(order.userId);

    res.json({
      ...order._doc,
      customer: {
        fullName: `${order.address.FirstName} ${order.address.LastName}`,
        phone: order.address.PhoneNumber,
        ...order.address,
        email: user?.email || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.put("/api/orders/status/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params; 
    const { status } = req.body;

    const updatedOrder = await Order.findOneAndUpdate(
      { orderNumber },
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (updatedOrder) {
      let message = "";
      if (status === "Order Placed") {
        message = `New order placed. Order Number: ${updatedOrder.orderNumber}`;
      } else if (status === "Cancelled") {
        message = `Order ${updatedOrder.orderNumber} has been cancelled.`;
      }
    
      if (message) {
        await Notification.create({
          type: "order",
          message,
        });
      }
    }    
    res.json({ message: "Order status updated", order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// PATCH /api/orders/payment/:id
router.patch("/api/orders/payment/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { payment } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { payment },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Payment status updated", payment: updatedOrder.payment });
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
