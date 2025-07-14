// routes/admin_routes/CustomerRoutes.js
import express from 'express';
import { getAllCustomers } from '../../controllers/admin_controller/customerController.js';

const router = express.Router();

router.get('/customer', getAllCustomers);

export default router;
