import express from 'express';
import { homeview, generatePdf, downloadPdf } from '../controllers/pdfController.js';
import User from '../models/Order.js';

const router = express.Router();

router.get('/', homeview);

router.get('/generate-pdf', generatePdf);
router.get('/download', downloadPdf);

router.get('/api/orders', async (req, res) => {
  try {
    const userOrder = await User.find();
    res.json(userOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

export const routes = router;
