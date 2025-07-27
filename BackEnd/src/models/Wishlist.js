import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.models.Wishlist ||
  mongoose.model("Wishlist", WishlistSchema);
