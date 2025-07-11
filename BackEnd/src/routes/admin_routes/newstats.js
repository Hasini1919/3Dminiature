import express from 'express';
import Order from '../../models/Admin_models/Order.js';

const router = express.Router();

//get count
router.get('/count-new', async (req , res) => {
    try {
        const newOrdersCount = await Order.countDocuments({status: 'new'});
        res.json({count:newOrdersCount});
    } catch (error) {
        console.error("Error fetching new order count:",error);
        res.status(500).json({message:"server error"});
    }
});

export default router;