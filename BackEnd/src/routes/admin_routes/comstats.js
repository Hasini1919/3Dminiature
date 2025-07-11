import express from 'express';
import Order from '../../models/Admin_models/Order.js';

const router = express.Router();

//get count
router.get('/count-completed', async (req , res) => {
    try {
        const comOrdersCount = await Order.countDocuments({status: 'completed'});
        res.json({count:comOrdersCount});
    } catch (error) {
        console.error("Error fetching completed order count:",error);
        res.status(500).json({message:"server error"});
    }
});

router.get("/revenue", async (req, res) => {
    try {
      const RevenueCost = await Order.find({ status: "completed" });
      const totalRevenue = RevenueCost.reduce((sum, order) => sum + order.price, 0);
      res.json({ revenue: totalRevenue });
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  });
  

export default router;