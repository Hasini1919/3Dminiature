// // controllers/admin_controllers/CustomerAnalyticsController.js
// import Customer from '../../models/Admin_models/Customer.js';

// export const getCustomerCount = async (req, res) => {
//     try {
//         const customerCount = await Customer.countDocuments();
//         res.json({ count: customerCount });
//     } catch (error) {
//         console.error("Error fetching customer count:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };
