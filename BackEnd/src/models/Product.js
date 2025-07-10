import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  imageUrl: {
    type: String,    
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  frameSize: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,     // keep price as Number
    required: true,
  },
  frameColor: {
    type: String,    // multiple frame colors
    required: true,
  },
  themeColor: {
    type: String,    // multiple theme colors
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;