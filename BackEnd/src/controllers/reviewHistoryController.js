// controllers/reviewHistoryController.js
import Review from "../models/Review.js";
import Product from "../models/Admin_models/Product.js";

export const getReviewHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const reviews = await Review.find({ user: userId })
      .populate("product", "title images price") // Include basic product info
      .sort({ createdAt: -1 });

    // Fix double /uploads/ in image paths
    const formattedReviews = reviews.map((review) => {
      const formattedImages = review.images.map((imgPath) => {
        return imgPath.replace("/uploads/uploads/", "/uploads/");
      });

      return {
        ...review._doc,
        images: formattedImages,
      };
    });

    res.status(200).json(formattedReviews);
  } catch (error) {
    console.error("Error fetching review history:", error);
    res.status(500).json({ message: "Failed to fetch review history" });
  }
};