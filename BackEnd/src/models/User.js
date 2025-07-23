import mongoose from "mongoose";

// Schema for individual cart items
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
    images: {
      type: [String],
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
      type: Number,
      required: true,
    },
    customText: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);



// Coupon schema
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    discountedValue: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Provience: { type: String, required: true }, 
    District: { type: String, required: true },
    Area: { type: String, required: true },
    City: { type: String, required: true },
    HouseNo: { type: String, required: true },
    AnyInformation: { type: String, default: "" },
  },
  { _id: false }
);
// Combined user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"], 
      default: "customer",
      required: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId && !this.facebookId && !this.instagramId; // Include instagramId too
      }
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    facebookId: {
      type: String,
      unique: true,
      sparse: true
    },

    instagramId: {
      type: String,
      unique: true,
      sparse: true
    },

    picture: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },

    // ✅ Role added here
    role: {
      type: String,
      enum: ['customer', 'admin'],
      default: 'customer'
    },
    cartData: {
      type: [cartItemSchema],
      default: [],
    },
    appliedCoupon: {
      type: couponSchema,
      default: null,
    },
    usedCoupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coupons",
      },
    ],
     address: {
      type: addressSchema,
      default: null, 
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;



















