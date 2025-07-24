import Notification from "../../models/Admin_models/Notification.js";
import Advertisement from "../../models/Advertisement.js";

export async function deactivateExpiredAdvertisements() {
    try {
        const now = new Date();
        const expiredAds = await Advertisement.find({ isActive: true, expiresAt: { $lt: now } });

        for (const ad of expiredAds) {
            ad.isActive = false;
            await ad.save();

            await Notification.create({
                type: "advertisement",
                message: `Advertisement titled "${ad.title}" has expired and is deactivated.`,

            });
            cron.schedule("0 1 * * *", async () => {
                console.log("Running daily cron job: Delete old notifications");
                await deleteOldNotifications();
            });
        } console.log(`Processed ${expiredAds.length} expired advertisements.`);
    } catch (error) {
        console.error("Error deactivating expired advertisements:", error);
    }
}
