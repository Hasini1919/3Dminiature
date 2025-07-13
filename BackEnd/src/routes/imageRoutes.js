// routes/imageRoute.js
import express from 'express';
import Products from '../models/productModel.js'; // adjust the path if needed

const router = express.Router();

router.get("/images", async (req, res) => {
  try {
    const products = await Products.find()
      .sort({ createdAt: -1 }) // Most recent first
      .limit(5);               // Limit to 5 results

    // Format response to match frontend expectation
    const imageData = products.map(product => ({
      _id: product._id,
      title: product.name,
      imageUrl: product.image[0] || "", // Only send the first image
    }));

    res.json(imageData);
  } catch (error) {
    console.error("Error fetching product images:", error);
    res.status(500).json({ error: "Failed to fetch product images" });
  }
});

export const routes = router;
