import express from 'express';
import Order from '../../models/Admin_models/Order.js';

const router = express.Router();

router.get('/completed', async (req , res) => {
    try {
        const comOrders = await Order.find({status:"completed"}).sort({date:-1});
        res.json(comOrders);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch completed orders",error});
    }
});


router.put('/:id/final', async(req, res) => {
    try {
        const OrderId = req.params.id;
        const {status} = req.body;

        const updateOrder = await Order.findOneAndUpdate(
            {id:OrderId},
            {status},
            {completed : true}
        );

        if (!updateOrder){
            return res.status(404).json({message:"Order not found"});
        }
        res.json(updateOrder);

    } catch (error) {
        res.status(500).json({message:"Failed to update status", error});
    }
});

export default router;