// utils/createNotification.js
import Notification from "../../models/Admin_models/Notification.js";

export async function createNotification(type, message) {
  try {
    const notification = new Notification({
      type,
      message,
    });
    await notification.save();
    return notification;
  } catch (error) {
    console.error("Notification creation failed:", error);
    throw error;
  }
}
