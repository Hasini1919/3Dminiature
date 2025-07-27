import User from  "../models/User.js"

const getUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("address");

    if (!user || !user.address) {
      return res.json({ success: false, message: "No address found" });
    }

    res.json({ success: true, address: user.address });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch address" });
  }
};

export default getUserAddress;