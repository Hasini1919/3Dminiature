// // scripts/sendExpiries.js
// import mongoose from "mongoose";
// import Advertisement from "../../models/Advertisement.js";
// import Coupon from "../../models/Coupon.js";
// import OrderModel from "../../models/Order.js";
// import Notification from "../../models/Admin_models/Notification.js";

// export async function generateExpiryNotifications() {
//   await mongoose.connect(process.env.MONGO_URI);

//   const now = new Date();

//   // 1. Advert expired
//   const ads = await Advertisement.find({ expiresAt: { $lte: now }, isActive: true });
//   for (let ad of ads) {
//     await Notification.create({ type:"AD_EXPIRED", refId: ad._id, message: `Advertisement expired for product ${ad.product}` });
//     ad.isActive = false;
//     await ad.save();
//   }

//   // 2. Coupon expired
//   const couponsExp = await Coupon.find({ validTo: { $lt: now }, active: true });
//   for (let cp of couponsExp) {
//     await Notification.create({ type:"CP_EXPIRED", refId: cp._id, message:`Coupon ${cp.code} expired` });
//     cp.active = false;
//     await cp.save();
//   }

//   // 3. Coupon max used
//   const couponsMaxed = await Coupon.find({ maxUses: { $ne: null }, usedCount: { $gte: mongoose.Types.Int32.MAX_VALUE } });
//   // Replace with actual logic comparing usedCount >= maxUses
//   for (let cp of couponsMaxed) {
//     if(cp.usedCount >= cp.maxUses) {
//       await Notification.create({ type:"CP_MAXUSED", refId: cp._id, message:`Coupon ${cp.code} reached max uses` });
//       cp.active = false;
//       await cp.save();
//     }
//   }

//   // 4. Orders placed
//   const recentOrders = await OrderModel.find({ status: "Order Placed", /* optionally filter new */ });
//   for(let o of recentOrders) {
//     await Notification.create({ type:"ORDER_PLACED", refId: o._id, message:`New order placed (#${o.orderNumber})` });
//   }

//   // 5. Pending refund
//   // Assuming RefundRequest model (like your sample)
//   // Similarly generate REFUND_REQUEST notifications
//   // Add after orders placed
// // import Refund from "../../models/RefundRequest.js"; // assume this exists

// // const refunds = await Refund.find({ status: "Pending" });
// // for (let r of refunds) {
// //   await Notification.create({
// //     type: "REFUND_REQUEST",
// //     refId: r._id,
// //     message: `Refund request received for Order #${r.orderNum}`,
// //   });
// // }

//   console.log("Notifications generated");
//   process.exit(0);
// }
