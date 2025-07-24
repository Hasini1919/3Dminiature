// cronJobs.js
import cron from "node-cron";
import Notification from "../../models/Admin_models/Notification.js";
import Advertisement from "../../models/Advertisement.js";

// Deactivate expired ads and create notifications
export async function deactivateExpiredAdvertisements() {
  try {
    const now = new Date();
    const expiredAds = await Advertisement.find({ 
      isActive: true, 
      expiresAt: { $lt: now } 
    });

    for (const ad of expiredAds) {
      ad.isActive = false;
      await ad.save();

      await Notification.create({
        type: "advertisement",
        message: `Advertisement "${ad.title}" has expired and been deactivated`,
        advertisementId: ad._id,
        productId: ad.product
      });
    }

    console.log(`Deactivated ${expiredAds.length} expired advertisements`);
  } catch (error) {
    console.error("Error deactivating expired advertisements:", error);
  }
}

// Delete old notifications (handled by MongoDB TTL)
// export async function deleteOldNotifications() {
//   // Handled automatically by MongoDB TTL index
// }

// Schedule jobs
export function startCronJobs() {
  // Run daily at 1 AM
  cron.schedule("0 0 * * *", deactivateExpiredAdvertisements);
  
  // Add other scheduled jobs if needed
}

export function startNotificationCleanupJob() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await Notification.deleteMany({
        expiresAt: { $lte: new Date() },
      });
      console.log(`[CRON] Deleted ${result.deletedCount} expired notifications`);
    } catch (err) {
      console.error("[CRON] Notification cleanup failed:", err);
    }
  });
}
