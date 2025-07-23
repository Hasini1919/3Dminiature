import Review from "../models/Review.js";

// Fetch all reviews written by the logged-in user
export const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id; // assumes `req.user` is populated by auth middleware
    const reviews = await Review.find({ userId }).populate("productId", "name image");

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch reviews", error });
  }
};
