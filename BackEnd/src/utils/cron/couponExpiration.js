import Notification from "../../models/Admin_models/Notification.js";
import Coupon from "../../models/Coupon.js";

export async function deactivateExpiredCoupons() {
  const now = new Date();
  const expiredCoupons = await Coupon.find({ active: true, validTo: { $lt: now } });

  for (const coupon of expiredCoupons) {
    coupon.active = false;
    await coupon.save();

    await Notification.create({
      type: "coupon",
      message: `Coupon code ${coupon.code} has expired and is now deactivated.`,
    });
  }
}
