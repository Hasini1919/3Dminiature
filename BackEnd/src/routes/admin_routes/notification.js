import express from 'express';
import Notification from '../../models/Admin_models/Notification.js';

const router = express.Router();

router.post('/add',async (req , res) => {
    const {type,message} = req.body;
    try {
        const newNotification = new Notification({type , message});
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).json({error:err.message})
        
    }
});

router.get('/',async(req,res) => {
    const notification = await Notification.find().sort({createdAt : -1});
    res.json(notification);
});


router.patch('/seen/:id', async(req,res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, {seen:true});
        res.json({message:"Marked as seen"});
    } catch (error) {
        res.status(500).json({err:error.message});
    }
})


export default router;