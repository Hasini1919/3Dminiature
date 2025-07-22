import express from 'express';
import { getDashboardStats } from '../../../controllers/admin_controller/test/dashboardController.js';

const router = express.Router();

router.get('/dashboard-stats', getDashboardStats);

export default router;
