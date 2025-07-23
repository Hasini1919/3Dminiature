// controllers/admin_controllers/NotificationController.js
import Notification from '../../models/Admin_models/Notification.js';

// Add new notification
export const addNotification = async (req, res) => {
    const { type, message } = req.body;
    try {
        const newNotification = new Notification({ type, message });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all notifications
export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Mark notification as seen
export const markNotificationSeen = async (req, res) => {
    try {
        await Notification.findByIdAndUpdate(req.params.id, { seen: true });
        res.json({ message: "Marked as seen" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
