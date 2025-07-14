// routes/admin_routes/OrderAnalyticsRoutes.js
import express from 'express';
import {
    getNewOrderCount // ✅ Import the new controller
} from '../../controllers/admin_controller/newstatsController.js';

const router = express.Router();


router.get('/count-new', getNewOrderCount); // ✅ Add the new route

export default router;
