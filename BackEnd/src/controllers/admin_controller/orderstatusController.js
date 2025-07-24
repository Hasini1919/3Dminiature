// controllers/admin_controllers/OrderStatusController.js
import Order from '../../models/Order.js';

// Get all new orders
export const getNewOrders = async (req, res) => {
    try {
        const newOrders = await Order.find({ status: "Order Placed" }).sort({ date: -1 });
        const flatOrders = [];

        newOrders.forEach((order) => {
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
        await Notification.create({
            type: "coupon",
            message: `Order Number ${orderNumber} is placed now.`,
          });
        res.status(200).json(flatOrders);

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch new orders", error });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const OrderId = req.params.id;
        const { status } = req.body;


        const validStatuses = ["Order Placed", "Processing", "Completed"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updateOrder = await Order.findOneAndUpdate(
            { _id: OrderId },
            { status },
            { new: true }
        );

        if (!updateOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

       
        await Notification.create({
            type: "coupon",
            message: `one Order  is placed.`,
          });

        res.json(updateOrder);

    } catch (error) {
        res.status(500).json({ message: "Failed to update status", error });
    }
};
