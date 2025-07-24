import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  mobile: {
    type: String,
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  birthday: Date,
  gender: {
    type: String,
    enum: ["male", "female", "other", ""],
    default: ""
  },
  profileImage: {
    type: String,
    default: "",
  },
  profileComplete: {
    type: Boolean,
    default: false
  },
  // Remove defaultShippingAddress referencing ShippingAddress collection
  // Instead you can handle default address inside User model's addresses array
  // and fetch it by populating User model in your controller
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.picture = ret.picture || "";
      return ret;
    }
  },
  toObject: { 
    virtuals: true,
    transform: function(doc, ret) {
      ret.picture = ret.picture || "";
      return ret;
    }
  }
});

// Remove virtual 'addresses' related to ShippingAddress collection

// Index for better query performance
customerSchema.index({ userId: 1, email: 1 });

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);