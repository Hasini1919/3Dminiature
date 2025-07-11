import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    rating: { type: Number, required: true },
    frameColor: { type: String, required: true },
    themeColor: { type: String, default: "defaultColor" },
    frameSize: { type: String, required: true },
    image: [{ type: String, required: true }], 
    detailed_description: { type: String }, 
  },
  { timestamps: true }
);

// Indexes
productSchema.index({ category: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({
  name: "text",
  description: "text",
  category: "text",
});

// Create model
const Products =
  mongoose.models.Product || mongoose.model("Products", productSchema);
export default Products;
