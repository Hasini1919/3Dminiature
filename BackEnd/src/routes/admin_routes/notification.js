// routes/notificationRoutes.js
import express from "express";
import Notification from "../../models/Admin_models/Notification.js";

const router = express.Router();

router.get("/api/notifications/unseen", async (req, res) => {
  try {
    const unseen = await Notification.find({ isSeen: false }).sort({ createdAt: -1 });
    res.json(unseen);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
});

router.patch("/api/notifications/seen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(
      id,
      { isSeen: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Marked as seen" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
});

router.get("/api/notifications", async (req, res) => {
  try {
    const all = await Notification.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

router.delete("/api/notifications/clear", async (req, res) => {
  try {
    const result = await Notification.deleteMany({});
    res.json({ message: "All notifications deleted", deleted: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete notifications" });
  }
});

// In your notification controller
router.patch("/api/notifications/mark-all-seen", async (req, res) => {
  try {
    await Notification.updateMany(
      { seen: false },
      { $set: { seen: true } }
    );
    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single notification
router.get("/api/notifications/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Not found" });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete single notification
router.delete("/api/notifications/:id", async (req, res) => {
  try {
    const deleted = await Notification.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Notification deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
