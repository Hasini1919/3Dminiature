import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    images: {
        type: [String],
        required:true,
    },

    name:{
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

    frameColor : {
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


}, { timestamps: true }
);

const Product = mongoose.model("Product",productSchema);

export default Product;