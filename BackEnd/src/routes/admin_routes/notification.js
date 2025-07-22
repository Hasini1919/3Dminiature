// routes/admin_routes/NotificationRoutes.js
import express from 'express';
import {
    addNotification,
    getNotifications,
    markNotificationSeen
} from '../../controllers/admin_controller/notificationController.js';

const router = express.Router();

router.post('/add', addNotification);
router.get('/', getNotifications);
router.patch('/seen/:id', markNotificationSeen);

export default router;
