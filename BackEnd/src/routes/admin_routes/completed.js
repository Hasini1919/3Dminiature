// routes/admin_routes/OrderRoutes.js
import express from 'express';
import {
    getCompletedOrders,
    markOrderAsFinal
} from '../../controllers/admin_controller/compController.js';

const router = express.Router();

// GET all completed orders
router.get('/completed', getCompletedOrders);

// PUT to update order status to final
router.put('/:id/final', markOrderAsFinal);

export default router;
