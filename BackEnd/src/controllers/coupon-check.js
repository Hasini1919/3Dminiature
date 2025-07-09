import User from  "../models/UserModel.js"

const checkCoupon = async(req,res)=>{
    const userId = req.userId;
    const user = await User.findById(userId);
    res.json({ appliedCoupon: user.appliedCoupon });

} 

export {checkCoupon};