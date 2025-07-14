// controllers/admin_controllers/OrderAnalyticsController.js
import Order from '../../models/Admin_models/Order.js';

// ✅ New: Count of pending orders
export const getPendingOrderCount = async (req, res) => {
    try {
        const pendingOrdersCount = await Order.countDocuments({ status: 'pending' });
        res.json({ count: pendingOrdersCount });
    } catch (error) {
        console.error("Error fetching pending order count:", error);
        res.status(500).json({ message: "Server error" });
    }
};
