import express from 'express';
import Order from '../../models/Admin_models/Order.js';

const router = express.Router();

//get count
router.get('/count-pending', async (req , res) => {
    try {
        const pendingOrdersCount = await Order.countDocuments({status: 'pending'});
        res.json({count:pendingOrdersCount});
    } catch (error) {
        console.error("Error fetching pending order count:",error);
        res.status(500).json({message:"server error"});
    }
});

export default router;