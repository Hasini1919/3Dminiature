import User from  "../models/User.js"

const checkCoupon = async(req,res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.json({ appliedCoupon: user.appliedCoupon });

} 

export {checkCoupon};