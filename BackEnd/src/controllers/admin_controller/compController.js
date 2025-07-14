// controllers/admin_controllers/OrderController.js
import Order from '../../models/Admin_models/Order.js';

// Get all completed orders
export const getCompletedOrders = async (req, res) => {
    try {
        const comOrders = await Order.find({ status: "completed" }).sort({ date: -1 });
        res.json(comOrders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch completed orders", error });
    }
};

// Update order to final/completed
export const markOrderAsFinal = async (req, res) => {
    try {
        const OrderId = req.params.id;
        const { status } = req.body;

        const updateOrder = await Order.findOneAndUpdate(
            { id: OrderId },
            { status },
            { new: true } // This ensures it returns the updated doc
        );

        if (!updateOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(updateOrder);

    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error });
    }
};
