// controllers/admin_controllers/CustomerController.js
import Customer from '../../models/Admin_models/Customer.js';

export const getAllCustomers = async (req, res) => {
    try {
        const customerdet = await Customer.find().sort({ id: -1 });
        res.json(customerdet);
        console.log("Customers fetched successfully");
    } catch (error) {
        res.status(400).json({ message: "Error fetching customers", error });
    }
};
 