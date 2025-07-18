// routes/imageRoute.js
import express from 'express';
import Product from '../models/Admin_models/Product.js'; // Adjust path if needed

const router = express.Router();

router.get("/images", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Most recent first
      .limit(7);               // Limit to 5 results

    const imageData = products.map(product => ({
      _id: product._id,
      title: product.name,
      imageUrl: (product.images && product.images.length > 0) ? product.images[0] : "",
    }));

    res.json(imageData);
  } catch (error) {
    console.error("Error fetching product images:", error);
    res.status(500).json({ error: "Failed to fetch product images" });
  }
});

export const routes = router;
