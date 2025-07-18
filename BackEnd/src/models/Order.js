import mongoose from "mongoose";

const OrderSchema= new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Object,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,required:true,default:"Order Placed"},
    paymentMethod:{type:String,required:true},
    payment:{type:Boolean,required:true,default:false},
    selectedShippingOption:{type:String,required:true,default:"Standard Shipping"},
    date:{type:Number,required:true},
    orderNumber: { type: String, required: true, unique: true },


});

const OrderModel=mongoose.models.OrderModel || mongoose.model("Orders",OrderSchema);

export default OrderModel;