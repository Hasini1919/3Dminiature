import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  province: {
    type: String,
    required: [true, 'Province is required'],
    enum: ['Northern', 'North Western', 'Western', 'North Central', 'Central', 'Sabaragamuwa', 'Eastern', 'Uva', 'Southern']
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    maxlength: [50, 'District cannot exceed 50 characters']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    maxlength: [50, 'City cannot exceed 50 characters']
  },
  area: {
    type: String,
    required: [true, 'Area/Street is required'],
    maxlength: [100, 'Area/Street cannot exceed 100 characters']
  },
  houseNo: {
    type: String,
    required: [true, 'House number is required'],
    maxlength: [20, 'House number cannot exceed 20 characters']
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    match: [/^[0-9]{5}$/, 'Please enter a valid 5-digit postal code']
  },
  country: {
    type: String,
    default: "Sri Lanka"
  },
  additionalInfo: {
    type: String,
    maxlength: [200, 'Additional information cannot exceed 200 characters']
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    enum: ['home', 'work', 'other'],
    default: 'home'
  }
}, {
  timestamps: true
});

// Handle default address
shippingAddressSchema.pre('save', async function(next) {
  if (this.isDefault) {
    await mongoose.model('ShippingAddress').updateMany(
      { customerId: this.customerId, _id: { $ne: this._id } },
      { $set: { isDefault: false } }
    );
  }
  next();
});

export default mongoose.models.ShippingAddress || mongoose.model("ShippingAddress", shippingAddressSchema);