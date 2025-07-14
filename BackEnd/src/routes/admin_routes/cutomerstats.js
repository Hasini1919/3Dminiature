// routes/admin_routes/CustomerAnalyticsRoutes.js
import express from 'express';
import { getCustomerCount } from '../../controllers/admin_controller/custstatsController.js';

const router = express.Router();

router.get('/count', getCustomerCount);

export default router;
