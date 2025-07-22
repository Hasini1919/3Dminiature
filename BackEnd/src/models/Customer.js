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
  defaultShippingAddress: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShippingAddress"
  }
}, {
  timestamps: true,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      // Ensure picture returns empty string instead of undefined
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

// Virtual for addresses
customerSchema.virtual('addresses', {
  ref: 'ShippingAddress',
  localField: '_id',
  foreignField: 'customerId'
});

// Add index for better query performance
customerSchema.index({ userId: 1, email: 1 });

export default mongoose.models.Customer || mongoose.model("Customer", customerSchema);