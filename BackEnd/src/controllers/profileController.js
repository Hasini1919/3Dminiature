import Customer from "../models/Customer.js";
import User from "../models/User.js";
import path from "path";
import fs from "fs";

// @desc    Get user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let customer = await Customer.findOne({ userId });

    if (!customer) {
      customer = await Customer.create({
        userId,
        email: req.user.email,
        profileComplete: false,
      });
    } else {
      if (!customer.email && req.user.email) {
        customer.email = req.user.email;
        await customer.save();
      }
    }

    const user = await User.findById(userId);

    res.status(200).json({
      profile: {
        name: customer.name || "",
        email: customer.email || req.user.email,
        mobile: customer.mobile || "",
        birthday: customer.birthday || "",
        gender: customer.gender || "",
        addresses: user?.address ? [user.address] : [],
        defaultAddress: user?.address || null,
      },
    });
  } catch (err) {
    console.error("getProfile error:", err);
    res.status(500).json({ message: err.message || "Server error" });
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
        email: req.user.email,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, profile: updatedCustomer });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Add or Update address
// @route   POST /api/profile/addresses
// @access  Private
export const addAddress = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      province,
      district,
      area,
      city,
      houseNo,
      postalCode,
      country,
      anyInformation,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !province ||
      !district ||
      !area ||
      !city ||
      !houseNo ||
      !country
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        address: {
          FirstName: firstName,
          LastName: lastName,
          PhoneNumber: phone || "",
          Provience: province,
          District: district,
          Area: area,
          City: city,
          HouseNo: houseNo,
          PostalCode: postalCode || "",
          Country: country,
          AnyInformation: anyInformation || "",
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, address: updatedUser.address });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // If no address exists yet
    if (!user.address) {
      return res.status(400).json({
        success: false,
        message: "No address found to update. Please add an address first.",
      });
    }

    const fields = [
      "firstName",
      "lastName",
      "province",
      "district",
      "city",
      "area",
      "houseNumber",
      "postalCode",
      "phone",
      "default",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        user.address[field] = req.body[field];
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get address
// @route   GET /api/profile/addresses
// @access  Private
export const getAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, addresses: [user.address] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Delete address (set to null)
// @route   DELETE /api/profile/addresses
// @access  Private
export const deleteAddress = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $unset: { address: 1 } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Address deleted",
      address: user.address,
    });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Set address as default (already default in this model)
// @route   PUT /api/profile/addresses/default
// @access  Private
export const setDefaultAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user || !user.address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found to set default" });
    }
    // Since we only store one address, it's by default already
    res.status(200).json({
      success: true,
      message: "Address is set as default",
      address: user.address,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getProfileImage = async (req, res) => {
  try {
    const userId = req.params.userId;
    const customer = await Customer.findOne({ userId });

    if (!customer || !customer.profileImage) {
      return res.status(404).json({ message: "Profile image not found" });
    }

    const imagePath = path.join(
      process.cwd(),
      "uploads",
      customer.profileImage
    );
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

export const uploadProfileImage = async (req, res) => {
  try {
     const userId = req.params.userId;
     const imagePath = req.file.path.replace(/\\/g, "/");

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const customer = await Customer.findOne({ userId });

    if (!customer) {
      fs.unlinkSync(req.file.path); // Remove uploaded file if customer not found
      return res.status(404).json({ message: "Customer not found" });
    }

    // Delete old image if exists
    if (customer.profileImage) {
      const oldImagePath = path.join(
        process.cwd(),
        "uploads",
        customer.profileImage
      );
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    customer.profileImage = req.file.filename;
    await customer.save();

    res
      .status(200)
      .json({
        message: "Profile image uploaded",
        imageUrl: `http://localhost:5500/${imagePath}`,
      });
  } catch (error) {
    console.error("Error uploading profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};