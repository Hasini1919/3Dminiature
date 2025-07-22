// routes/admin_routes/OrderStatusRoutes.js
import express from 'express';
import {
    getNewOrders,
    updateOrderStatus
} from '../../controllers/admin_controller/orderstatusController.js';

const router = express.Router();

router.get('/new', getNewOrders);
router.put('/:id/status', updateOrderStatus);

export default router;
