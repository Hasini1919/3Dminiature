import multer from "multer";
import express from 'express';
import fs from "fs";
import path from "path";
import Product from "../../models/admin_models/Product.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let productName = req.body.name;

        if (!productName) {
            return cb(new Error("Product name is required for folder creation"), null);
        }

        //sanitize the folder name to avoid illegal characters
        const safeFolderName = productName.replace(/[^a-zA-Z0-9_-]/g, "_");
        const uploadPath = path.join("src/uploads", safeFolderName);

        //check if folder exits
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }


        cb(null, uploadPath); // Ensure 'uploads/' exists
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },

});

const upload = multer({ storage });




// add new Product
router.post("/", upload.array("images", 5), async (req, res) => {
    try {
        let { name, frameSize, description, price, frameColor, themeColor, category } = req.body;
        console.log("Finished Add new product");

        if (!name || !frameSize || !description || !price || !frameColor || !themeColor || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

         // Parse comma-separated strings into arrays if needed
         frameSize = typeof frameSize === "string" ? frameSize.split(",") : frameSize;
         frameColor = typeof frameColor === "string" ? frameColor.split(",") : frameColor;
         themeColor = typeof themeColor === "string" ? themeColor.split(",") : themeColor;

        // Get uploaded image file paths

        const imagePaths = req.files?.map(file => file.path) || [];


        const newProduct = new Product({
            name,
            frameSize,
            description,
            price,
            frameColor, 
            themeColor, 
            category,
            images: imagePaths, // Save image paths in DB

        });

        await newProduct.save();
        res.json({ message: "Product added successfully", newProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product" });
    }
});

//Get All Product 
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ _id: -1 });
        res.json(products);
        console.log("Product gets successfully");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;