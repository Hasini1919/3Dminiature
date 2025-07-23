// routes/admin_routes/OrderPendingRoutes.js
import express from 'express';
import {
    getPendingOrders,
    updatePendingOrderStatus
} from '../../controllers/admin_controller/pendingController.js';

const router = express.Router();

router.get('/pending', getPendingOrders);
router.put('/:id/status', updatePendingOrderStatus);

export default router;
