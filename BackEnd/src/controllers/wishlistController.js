import Wishlist from "../models/Wishlist.js";
import Product from "../models/Admin_models/Product.js";
import Advertisement from "../models/Advertisement.js";

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

    const ads = await Advertisement.find({ product: { $in: productIds } });

    const adDiscountMap = {};
    ads.forEach((ad) => {
      adDiscountMap[ad.product.toString()] = ad.discountPercentage;
    });

    const enrichedProducts = products.map((prod) => {
      const adDiscount = adDiscountMap[prod._id.toString()];
      const discount =
        adDiscount !== undefined ? adDiscount : prod.discount || 0;
      const discountedPrice = Math.round(prod.price * (1 - discount / 100));

      return {
        ...prod.toObject(),
        discount,
        discountedPrice,
      };
    });

    res.json(enrichedProducts);
  } catch (error) {
    console.error("Error in getWishlistProducts:", error);
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
