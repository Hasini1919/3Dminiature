import express from 'express';
import Customer from '../../models/Admin_models/Customer.js';

const router = express.Router();

//get count
router.get('/count', async (req , res) => {
    try {
        const customerCount = await Customer.countDocuments();
        res.json({count:customerCount});
    } catch (error) {
        console.error("Error fetching customer count:",error);
        res.status(500).json({message:"server error"});
    }
});

export default router;