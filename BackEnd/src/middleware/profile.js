// middleware/profile.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Customer from "../models/Customer.js";

const profileAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    let customer = await Customer.findOne({ userId: user._id });
    if (!customer) {
      customer = await Customer.create({
        userId: user._id,
        email: user.email,
        profileComplete: false,
      });
    }

    req.user = {
      _id: user._id,
      email: user.email,
      role: user.role,
      customerId: customer._id,
    };
    req.customer = customer;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Not authorized", message: error.message });
  }
};

export default profileAuth;