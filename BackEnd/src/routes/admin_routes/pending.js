import express from 'express' ;
import Order from '../../models/Admin_models/Order.js';

const router = express.Router();

router.get('/pending' ,async(req , res) => {
    try {
        const pendingOrders = await Order.find({status:"pending"}).sort({date:-1});
        res.json(pendingOrders);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch pending orders",error});
    }
});

router.put('/:id/status', async(req, res) => {
    try {
        const OrderId = req.params.id;
        const {status} = req.body;

        const updateOrder = await Order.findOneAndUpdate(
            {id:OrderId},
            {status},
            {pending : true}
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