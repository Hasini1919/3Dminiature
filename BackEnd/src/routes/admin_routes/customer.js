import express from 'express'
import Customer from '../../models/Admin_models/Customer.js'

const router = express.Router();

router.get('/customer',async(req , res) => {
    try {
        const customerdet = await Customer.find().sort({id:-1});
        res.json(customerdet);
        console.log("Customer Added success");
    } catch (error) {
        res.status(400).json({message:"Error from fetching customers"});
    }
})

export default router;