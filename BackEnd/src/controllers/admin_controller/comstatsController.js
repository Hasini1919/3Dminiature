// // controllers/admin_controllers/OrderAnalyticsController.js
// import Order from '../../models/Order.js';

// // Get count of completed orders
// export const getCompletedOrderCount = async (req, res) => {
//     try {
//         const comOrdersCount = await Order.countDocuments({ status: 'completed' });
//         res.json({ count: comOrdersCount });
//     } catch (error) {
//         console.error("Error fetching completed order count:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // Get total revenue from completed orders
// export const getTotalRevenue = async (req, res) => {
//     try {
//         const completedOrders = await Order.find({ status: "completed" });
//         const totalRevenue = completedOrders.reduce((sum, order) => sum + order.price, 0);
//         res.json({ revenue: totalRevenue });
//     } catch (error) {
//         res.status(500).json({ error: "Something went wrong" });
//     }
// };
