// controllers/ProductController.js
import fs from "fs";
import path from "path";
import Product from "../../models/Admin_models/Product.js";

// Create folder if not exist (used in multer)
export const getUploadPath = (productName) => {
    const safeFolderName = productName.replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadPath = path.join("src/uploads", safeFolderName);

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    return uploadPath;
};

// Add new product
export const addProduct = async (req, res) => {
    try {
        let { name, frameSize, description, price, frameColor, themeColor, category } = req.body;
        console.log("Finished Add new product");

        if (!name || !frameSize || !description || !price || !frameColor || !themeColor || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Convert comma-separated strings to arrays
        frameSize = typeof frameSize === "string" ? frameSize.split(",") : frameSize;
        frameColor = typeof frameColor === "string" ? frameColor.split(",") : frameColor;
        themeColor = typeof themeColor === "string" ? themeColor.split(",") : themeColor;

        const imagePaths = req.files?.map(file => file.path) || [];

        const newProduct = new Product({
            name,
            frameSize,
            description,
            price,
            frameColor,
            themeColor,
            category,
            images: imagePaths,
        });

        await newProduct.save();
        res.json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product" });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.json(products);
        console.log("Product gets successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
