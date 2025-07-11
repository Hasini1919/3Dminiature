import express from 'express';
import Order from '../../models/Admin_models/Order.js'


const router = express.Router();
//Get New
router.get('/new', async (req, res) => {
    try{
        const newOrders = await Order.find({status:"new"}).sort({date: -1});
        res.json(newOrders);
    } catch (error) {
        res.status(500).json({message: "Failed to fetch new orders",error});
    }
});


router.put('/:id/status', async(req, res) => {
    try {
        const OrderId = req.params.id;
        const {status} = req.body;

        const updateOrder = await Order.findOneAndUpdate(
            {id:OrderId},
            {status},
            {new : true}
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