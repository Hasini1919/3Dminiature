import mongoose from "mongoose";

// Define schema for individual cart items
const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    frameSize: {
      type: String,
      required: true,
    },
    frameColor: {
      type: String,
      required: true,
    },
    themeColor: {
      type: String,
      required: true,
    },
    uploadedImageFiles: {
      type: [String],
      required: true,
    },
    quantity: {
      type:  Number,
      required: true,
    },
    customText: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);
const couponSchema=new mongoose.Schema(
  {
    code:{
      type:String,
      required:true
    },
    discountType:{
      type:String,
      enum: ['percentage', 'fixed'],
      required:true
    },
    discountValue:{
      type:Number,
      required:true
    },
    appliedAt:{
      type:Date,
      default:Date.now
    },
    discountedValue:{
      type:Number,
      required:true
    }

  },{_id:false}
  
);

// Define schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: [cartItemSchema],
    default: [],
  },
  appliedCoupon: {
    type: couponSchema,
    default: null
  },
  usedCoupons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coupons'
  }]
});

// Register the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
