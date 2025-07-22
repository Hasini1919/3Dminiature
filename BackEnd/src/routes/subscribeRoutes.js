import express from 'express';
import SubscribeModel from '../models/subscribe.js';

const router = express.Router();

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    const existing = await SubscribeModel.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(200).json({ message: "You are already subscribed." });
    }

    const subscribe = new SubscribeModel({ email: email.toLowerCase() });
    await subscribe.save();

    return res.status(200).json({ message: "Subscription successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const routes = router;

