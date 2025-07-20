import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String],
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    frameSize: {
      type: [String],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    frameColor: {
      type: [String],
      required: true,
    },

    themeColor: {
      type: [String],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    discountPercentage: {
      type: Number,
      default: 0, // optional
    },

    detailed_description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes
productSchema.index({ category: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;