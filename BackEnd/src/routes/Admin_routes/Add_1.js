import multer from "multer";
import express from 'express';
import Product from "../../models/Admin_models/Product.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure 'uploads/' exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
    
});

const upload = multer({ storage });




// add new Product
router.post("/", upload.array("images", 5), async (req, res) => {
        try {
        const{name,frameSize,description,price,frameColor,themeColor,category} = req.body;
        console.log("Finished Add new product");
        
        if (!name || !frameSize || !description || !price || !frameColor || !themeColor || !category ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        // Get uploaded image file paths

        const imagePaths = req.files?.map(file => file.path) || [];


        const newProduct = new Product({
            name,
            frameSize,
            description,
            price,
            frameColor: Array.isArray(frameColor) ? frameColor : [frameColor], // Ensure array format
            themeColor: Array.isArray(themeColor) ? themeColor : [themeColor],
            category,
            images: imagePaths, // Save image paths in DB

        });
       
        await newProduct.save();
        res.json({message:"Product added successfully", newProduct});
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: "Failed to add product" });
    }
});

//Get All Product 
router.get('/',async(req,res)=>{
    try {
        const products = await Product.find().sort({_id: -1});
        res.json(products);
        console.log("Product gets successfully");
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});



export default router;