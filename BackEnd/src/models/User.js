import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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
    sparse: true
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

  picture: String,

  resetPasswordToken: String,
  resetPasswordExpires: Date,

  // ✅ Role added here
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
