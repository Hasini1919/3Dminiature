// controllers/admin_controllers/OrderAnalyticsController.js
import Order from '../../models/Admin_models/Order.js';


// ✅ New: Get count of new orders
export const getNewOrderCount = async (req, res) => {
    try {
        const newOrdersCount = await Order.countDocuments({ status: 'new' });
        res.json({ count: newOrdersCount });
    } catch (error) {
        console.error("Error fetching new order count:", error);
        res.status(500).json({ message: "Server error" });
    }
};
