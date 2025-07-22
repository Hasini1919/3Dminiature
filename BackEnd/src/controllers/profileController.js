import Customer from '../models/Customer.js';
import ShippingAddress from '../models/ShippingAddress.js';
import path from "path";
import fs from "fs";
// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
 export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find customer by userId, populate related addresses and default shipping address
    let customer = await Customer.findOne({ userId })
      .populate('addresses')
      .populate('defaultShippingAddress');

    // If customer doesn't exist, create one
    if (!customer) {
      customer = await Customer.create({
        userId,
        email: req.user.email,
        profileComplete: false,
      });
      // You may want to re-query to get populated fields if needed, or just return empty addresses
      customer.addresses = [];
      customer.defaultShippingAddress = null;
    }
    else{
       if (!customer.email && req.user.email) {
        customer.email = req.user.email;
        await customer.save();
      }
    }

    // Respond with cleaned profile data
    res.status(200).json({
      profile: {
        name: customer.name || '',
        email: customer.email  || req.user.email,
        mobile: customer.mobile || '',
        birthday: customer.birthday || '',
        gender: customer.gender || '',
        addresses: customer.addresses || [],
        defaultAddress: customer.defaultShippingAddress || null,
      },
    });
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
};


// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, mobile, birthday, gender } = req.body;

    const updatedCustomer = await Customer.findOneAndUpdate(
      { userId: req.user._id },
      {
        name,
        mobile,
        birthday,
        gender,
        profileComplete: true,
        email: req.user.email   // ✅ Automatically from logged-in user
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, profile: updatedCustomer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


// @desc    Add new address
// @route   POST /api/profile/addresses
// @access  Private
export const addAddress = async (req, res) => {
  try {
    const newAddress = await ShippingAddress.create({
      ...req.body,
      userId: req.user._id,
      customerId: req.user.customerId
    });

    // Update customer's addresses array
    await Customer.findByIdAndUpdate(
      req.user.customerId,
      { $push: { addresses: newAddress._id } }
    );

    res.status(201).json({ success: true, address: newAddress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update address
// @route   PUT /api/profile/addresses/:id
// @access  Private
export const updateAddress = async (req, res) => {
  try {
    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedAddress) {
      return res.status(404).json({ success: false, message: 'Address not found' });
    }

    res.status(200).json({ success: true, address: updatedAddress });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete address
// @route   DELETE /api/profile/addresses/:id
// @access  Private
export const deleteAddress = async (req, res) => {
  try {
    // Remove from addresses array in Customer
    await Customer.findByIdAndUpdate(
      req.user.customerId,
      { $pull: { addresses: req.params.id } }
    );

    // Delete the address
    await ShippingAddress.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Address deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Set default address
// @route   PUT /api/profile/addresses/default/:id
// @access  Private
export const setDefaultAddress = async (req, res) => {
  try {
    // First unset any existing default
    await Customer.findOneAndUpdate(
      { userId: req.user._id },
      { defaultShippingAddress: null }
    );

    // Set new default
    const customer = await Customer.findOneAndUpdate(
      { userId: req.user._id },
      { defaultShippingAddress: req.params.id },
      { new: true }
    );

    res.status(200).json({ 
      success: true,
      defaultAddress: customer.defaultShippingAddress
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get all addresses for a user
// @route   GET /api/profile/addresses
// @access  Private

export const getAddresses = async (req, res) => {
  try {
    const customer = await Customer.findOne({ userId: req.user._id }).populate('addresses');
    if (!customer) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, addresses: customer.addresses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const userId = req.params.userId;

    const customer = await Customer.findOne({ userId });
    if (!customer) {
      // Delete uploaded file if customer not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Customer not found" });
    }

    // If previous profile image exists, delete it
    if (customer.profileImage) {
      const oldImagePath = path.join(process.cwd(), "uploads", customer.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    // Save new profile image filename in DB
    customer.profileImage = req.file.filename;
    await customer.save();

    res.status(200).json({ message: "Profile image uploaded", filename: req.file.filename });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProfileImage = async (req, res) => {
  try {
    const userId = req.params.userId;

    const customer = await Customer.findOne({ userId });
    if (!customer || !customer.profileImage) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    const imagePath = path.join(process.cwd(), "uploads", customer.profileImage);
    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).json({ message: "Image file not found on server" });
    }
  } catch (error) {
    console.error("Error getting profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};
