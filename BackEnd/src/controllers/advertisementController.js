import Advertisement from "../models/Advertisement.js";

// Create new advertisement
export const createAdvertisement = async (req, res) => {
  try {
    const advertisement = new Advertisement(req.body);
    await advertisement.save();
    res.status(201).json(advertisement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all active advertisements
export const getActiveAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find({ isActive: true }).sort({
      order: 1,
      createdAt: -1,
    });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update advertisement
export const updateAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ad) return res.status(404).json({ error: "Advertisement not found" });
    res.json(ad);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete advertisement (soft delete)
export const deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!ad) return res.status(404).json({ error: "Advertisement not found" });
    res.json({ message: "Advertisement deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
