import Advertisement from "../models/Advertisement.js";
import Product from "../models/Admin_models/Product.js";

// Create new advertisement (with product validation)
export const createAdvertisement = async (req, res) => {
  try {
    const { product, title, mainTitle, img, discountPercentage, expiresAt, order } =
      req.body;

    // Ensure product exists
    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Create the ad
    const advertisement = new Advertisement({
      product,
      mainTitle,
      title,
      img,
      discountPercentage,
      expiresAt,
      order,
    });

    await advertisement.save();
    res.status(201).json(advertisement);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all active ads with connected product details
export const getActiveAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .populate("product", "name price images"); // Include product info
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an advertisement
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

// Soft delete (deactivate) ad
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


