import express from 'express';
import EnquiryModel from '../models/enquiry.js'; // Note the `.js` extension in ESM
const router = express.Router();

router.post('/enquiry', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const enquiry = new EnquiryModel({ name, email, phone, message });
    await enquiry.save();

    return res.status(200).json({ message: "Enquiry has been sent" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export const routes = router;
