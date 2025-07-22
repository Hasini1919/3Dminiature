import OrderModel  from "../models/Order.js";
import User from  "../models/User.js"
import { sendOrderConfirmationEmail } from "../utils/mailer.js";

import Counter from "../models/Counter.js"
import Coupon from "../models/Coupon.js"
//placing Order using Cash on delivery
const placeOrder=async(req,res)=>{


    try{
        const {
            
            items,
            amount,
            address,
            selectedShippingOption,
            buyNow
           
        } = req.body;
         const userId = req.user._id;
         console.log("buy now item");
        console.log(buyNow);
        let orderCounter = await Counter.findOneAndUpdate(
          { id: "orderNumber" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );

        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `ORD-${randomDigits}-${String(orderCounter.seq).padStart(6, '0')}`;

        const orderData = {
            userId,
            items,
            amount,
            address,
            status: "Order Placed",
            paymentMethod: "COD",
            payment: false,
            selectedShippingOption,
            date: Date.now(),
            orderNumber
        };
       console.log("user order details");
       console.log(orderData);
       const newOrder=new OrderModel(orderData);
       await newOrder.save();
       if (!buyNow) {
      await User.findByIdAndUpdate(userId, { cartData: [] });
      }
    
     
     const user = await User.findById(userId);
     
     if(user){
          console.log("user address");
          console.log(address);
          user.address=address;
     }
     await user.save();
      
     if(user?.appliedCoupon?.code){

      const couponDoc=await Coupon.findOne({code:user.appliedCoupon.code});
      

      if(couponDoc && !user.usedCoupons.includes(couponDoc._id)){
       
        user.usedCoupons.push(couponDoc._id);
        console.log(couponDoc._id)
      
        user.appliedCoupon=null;
      }
      await user.save();
     }


     if (user && user.email) {
     
      const orderDetails = {
          amount: orderData.amount,
          items: orderData.items,
          paymentMethod: orderData.paymentMethod,
          orderNumber: orderData.orderNumber,
          
      };
      console.log("Sending email to:", user.email || "No email found");

    
      await sendOrderConfirmationEmail(user.email, orderDetails);
  }

     res.json({success:true,message:"Order Placed"});
    }
    catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
    

}
//placing Order using PayHere Method
const placeOrderPayHere = async (req, res) => {
  try {
    const {
      items,
      amount,
      address,
      selectedShippingOption,
      buyNow,
    } = req.body;

    const userId = req.user._id;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${randomDigits}-${Date.now()}`;

    const orderData = {
      userId,
      items,
      amount,
      address,
      status: "order placed pending",
      paymentMethod: "Stripe",
      payment: false,
      selectedShippingOption,
      date: Date.now(),
      orderNumber,
      buyNow: buyNow || false,
    };

    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();

    res.json({
      success: true,
      orderNumber,
      orderId: savedOrder._id,
      amount,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


//All Orders data for Admin Panel
const allOrders=async(req,res)=>{

}
//User Orderdata for Frontend
const userOrders=async(req,res)=>{
     try{
         const userId = req.user._id;
        const orders=await OrderModel.find({userId});
        res.json({success:true,orders});
     }
     catch(error){
        console.log(error.message);
        res.json({success:false,message:error.message});
     }
}
const getuserOrderDataBystatus = async (req, res) => {
  try {
     const userId = req.user._id;
    const { status } = req.query;
  
    
    if (!userId || !status) {
      return res.status(400).json({ message: 'userId and status are required' });
    }
    const statusArray = Array.isArray(status) ? status : [status];
    const orders = await OrderModel.find({ userId, status: { $in: statusArray } });
   

    if (!orders || orders.length === 0) {
      return res.json({ message: 'No matching orders found' });
    }

    res.status(200).json({success:true,orders});
  } catch (error) {
    console.error('Error fetching filtered orders:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


//Update Order Status from AdminPanel
const updateStatus=async(req,res)=>{

}

//get the User LastAddress
const getUserAddress=async(req,res)=>{
    try{
         const userId = req.user._id;
         // Find the most recent order for this user
         const latestOrder = await OrderModel.findOne({ userId })
         .sort({ date: -1 }) // Sort by date in descending order
         .limit(1);

            
    if (!latestOrder) {
        return res.json({ 
          success: false, 
          message: 'No orders found for this user' 
        });
      }
    
    
     const { address } = latestOrder;

     res.status(200).json({ 
        success: true, 
        address 
      });
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: error.message 
          });

    }

}

const getlastestOrder=async(req,res)=>{
    try{
        const userId = req.user._id;
        const latestOrder = await OrderModel.findOne({ userId })
        .sort({ date: -1 }) // Sort by date in descending order
        .limit(1);

        if (!latestOrder) {
            return res.json({ 
              success: false, 
              message: 'No orders found for this user' 
            });
          }
        
          res.status(200).json({ 
            success: true, 
            latestOrder
          });
        
    }
    catch(error){
        res.status(500).json({ 
            success: false, 
            message: error.message 
          });
    }
}
export {placeOrder,placeOrderPayHere,allOrders,userOrders,updateStatus,getUserAddress,getlastestOrder,getuserOrderDataBystatus};