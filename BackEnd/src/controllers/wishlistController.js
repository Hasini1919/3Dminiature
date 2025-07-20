import Wishlist from "../models/Wishlist.js";
import Product from "../models/Admin_models/Product.js";

export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [{ productId }] });
    } else {
      const exists = wishlist.products.some(
        (item) => item.productId === productId
      );
      if (!exists) {
        wishlist.products.push({ productId });
      }
    }

    await wishlist.save();
    res.status(200).json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlistCount = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    const count = wishlist ? wishlist.products.length : 0;
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getWishlistProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist || wishlist.products.length === 0) {
      return res.json([]);
    }

    const productIds = wishlist.products.map((p) => p.productId);
    const products = await Product.find({ _id: { $in: productIds } });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) return res.status(404).json({ error: "Wishlist not found" });

    wishlist.products = wishlist.products.filter(
      (item) => item.productId !== productId
    );
    await wishlist.save();
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
