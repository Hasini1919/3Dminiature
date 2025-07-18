import Product from "../models/Admin_models/Product.js";

const addProducts = async (req, res) => {
  try {
    const { name, price, frameSize, description, frameColor, themeColor, category } = req.body;
    const image = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      name,
      price,
      frameSize,
      description,
      frameColor,
      themeColor,
      category,
      images: [image]
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server error while adding product" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log("product details from admin");
    console.log(products);
   console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export  { addProducts, getProducts };  
