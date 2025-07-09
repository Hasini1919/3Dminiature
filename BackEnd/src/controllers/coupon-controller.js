import coupons from "../models/Coupon.js";
import User from  "../models/UserModel.js";

const ApplyCoupon= async(req,res) =>{

    const { couponCode, totalAmount } = req.body;
    const userId = req.userId;
    try{
        const coupon = await coupons.findOne({ code: couponCode, active: true });
       
       
        if (!coupon) {
            return res.json({ success: false, message: "Invalid coupon code." });
          }
          const user = await User.findById(userId);
          if (!user) {
            return res.json({ 
                success: false, 
                message: "User not found." 
            });
        }
          if (user.usedCoupons.includes(coupon._id)) {
            return res.json({ 
              success: false, 
              message: "You have already used this coupon." 
            });
          }

          const currentDate = new Date();
          
          if (currentDate < coupon.validFrom || currentDate > coupon.validTo) {
            return res.json({ success: false, message: "Coupon has expired." });
          }
          if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
            return res.json({ success: false, message: "Coupon usage limit reached." });
          }
          if (totalAmount < coupon.minPurchaseAmount) {
            return res.json({
              success: false,
              message: `Minimum purchase of ${coupon.minPurchaseAmount} required.`,
            });
          }
          let discountAmount = 0;
          if (coupon.discountType === "percentage") {
            discountAmount = (totalAmount * coupon.discountValue) / 100;
          } else if (coupon.discountType === "fixed") {
            discountAmount = coupon.discountValue;
          }
          const discountedTotal = totalAmount - discountAmount;
          user.appliedCoupon = {
            code: coupon.code,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            appliedAt: new Date(),
            discountedValue:discountedTotal
          };
          await user.save();

          coupon.usedCount += 1;
          await coupon.save();

        
          res.status(200).json({
            success: true,
            discountedTotal,
            coupon: user.appliedCoupon
          });  
      
    }
    catch(error){
        console.error("Error applying coupon:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
    
}

export {ApplyCoupon};