import Order from '../../../models/Order.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const uniqueCustomers = await Order.distinct('userId');

    const orderPlacedCount = await Order.countDocuments({ status: "Order Placed" });
    const processingCount = await Order.countDocuments({ status: "Processing" });
    const completedCount = await Order.countDocuments({ status: "Completed" });
    const canceledCount = await Order.countDocuments({ status: "Canceled" });

    const revenueData = await Order.aggregate([
      { $match: { status: "Completed" } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    res.status(200).json({
      totalOrders,
      totalCustomers: uniqueCustomers.length,
      orderPlacedCount,
      processingCount,
      completedCount,
      canceledCount,
      totalRevenue,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
