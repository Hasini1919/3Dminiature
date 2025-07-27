import Review from "../models/Review.js";
// Add a review
export const addReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    let imageUrls = [];

   if (req.files && req.files.length > 0) {
     imageUrls = req.files.map((file) => {
       return `/uploads/${file.filename}`; 
     });
   }

    const newReview = new Review({
      user,
      product,
      rating,
      comment,
      images: imageUrls,
    });
    await newReview.save();
    res.status(201).json({ message: "Review added!", review: newReview });
  } catch (error) {
    console.error("Add Review Error:", error);
    res.status(500).json({ message: "Server error while adding review" });
  }
};

// Get reviews for a product
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
