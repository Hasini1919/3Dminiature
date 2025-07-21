// controllers/admin_controllers/OrderController.js
import Order from '../../models/Order.js';

// Get all completed orders
export const getCompletedOrders = async (req, res) => {
    try {
        const comOrders = await Order.find({ status: "Completed" }).sort({ date: -1 });
        const flatOrders = [];

        comOrders.forEach((order) => {
            order.items.forEach((item) => {
                flatOrders.push({
                    _id: order._id.toString(),
                    orderNumber: order.orderNumber,
                    userId: order.userId,
                    status: order.status,
                    date: order.date,
                    // From product item
                    productId: item.productId,
                    name: item.name,
                    cid: order.userId,  // or some other customer id if you have
                    category: item.category || "-", // add category if you store it in item, else "-"
                    frameColor: item.frameColor,
                    theme: item.themeColor || item.theme || "-",
                    size: item.size,
                    customization: item.customText || "-",
                    price: item.price,
                    quantity: item.quantity,
                });
            });
        });

        res.status(200).json(flatOrders);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch completed orders", error });
    }
};

// Update order to final/completed
export const markOrderAsFinal = async (req, res) => {
    try {
        const OrderId = req.params.id;
        const { status } = req.body;

        const validStatuses = ["Order Placed", "Pending", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }


        const updateOrder = await Order.findOneAndUpdate(
            { _id: OrderId },
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
