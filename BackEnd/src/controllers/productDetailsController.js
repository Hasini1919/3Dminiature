import  multer from "multer";
import mongoose from 'mongoose';
import Products from "../models/productModel.js"; 
import path  from "path";

   // Get product details by ID
export const getProductDetailsById = async (req, res) => {
  try {
    const productId = req.params.id;
    let product = await Products.findOne({ _id: productId });

    if (!product && mongoose.Types.ObjectId.isValid(productId)) {
      product = await Products.findOne({
        $or: [
          { _id: productId },
          { _id: new mongoose.Types.ObjectId(productId) },
        ],
      });
    }

    if (!product) {
      product = await Products.findOne({
        $expr: {
          $eq: [{ $toString: "$_id" }, productId],
        },
      });
    }

    if (!product) {
      const exampleProducts = await Products.find().limit(3);
      return res.status(404).json({
        message: "Product not found",
        details: {
          requestedId: productId,
          totalProducts: await Products.countDocuments(),
          exampleIds: exampleProducts.map((p) => p._id),
          idType: typeof exampleProducts[0]?._id,
        },
      });
    }

    // NEW: Get related products (same category)
    const relatedProducts = product.category
      ? await Products.find({
          category: product.category,
          _id: { $ne: product._id },
        }).limit(6)
      : [];

    // Maintain backward compatibility
    const response = {
      // Original response structure
      ...product.toObject(),
      // New fields (won't break existing frontend)
      relatedProducts,
      // Ensure rating always exists
      rating: product.rating || 0,
    };

    return res.json(response);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
    
    // Upload customer images
export const uploadImages = (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const fileUrls = files.map(file => `/uploads/${file.filename}`);
    res.status(200).json({ uploaded: true, fileUrls });

  } catch (error) {
    console.error("Image Upload Error:", error);

    if (error instanceof multer.MulterError) {
      return res.status(400).json({ message: "Multer error", error: error.message });
    }

    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};
