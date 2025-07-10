import User from  "../models/UserModel.js"
import Product from  "../models/Product.js";
import path from "path";
import fs from "fs";

// Add to Cart
const addToCart = async (req, res) => {
  
  const {
    
    productId,
    frameSize,
    frameColor,
    themeColor,
    quantity,
    customText,
  } = req.body;

  
  const userId = req.userId;
  

  // Array of uploaded image file paths
  const uploadedImageFiles = req.files
    ? req.files.map((file) => `/uploads/user-uploads/${file.filename}`)
    : [];
    
   


  try {
    const user = await User.findById(userId);
    console.log(productId);
    const product = await Product.findById(productId);
    
    console.log(product);

    if (!user || !product) {
      
   
      return res.status(404).json({ message: "User or Product not found" });
    }

    // Check if item already exists (simplified match check for now)
    const existingCartItemIndex = user.cartData.findIndex(
      (item) =>
        String(item.productId) === String(productId) &&
        item.frameSize === frameSize &&
        item.frameColor === frameColor &&
        item.themeColor === themeColor &&
        item.customText === customText &&
        JSON.stringify(item.uploadedImageFiles) ===
          JSON.stringify(uploadedImageFiles)
    );

    if (existingCartItemIndex !== -1) {
      // Update quantity
      user.cartData[existingCartItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new item
      const newCartItem = {
        productId,
        productName: product.name,
        productImage: product.imageUrl,
        price: product.price,
        frameSize,
        frameColor,
        themeColor,
        uploadedImageFiles,
        quantity: parseInt(quantity),
        customText,
      };
      
      user.cartData.push(newCartItem);
    }

    await user.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cartData: user.cartData,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Get Cart Data
const getCartData = async (req, res) => {
  try {
    
    const userId = req.userId;
    const userData = await User.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cartData: userData.cartData });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Cart Item
const updateCart = async (req, res) => {
  const {
    
    productId,
    frameSize,
    frameColor,
    themeColor,
    quantity,
    uploadedImageFiles, 
    customText
  } = req.body;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const itemIndex = user.cartData.findIndex(item =>
      String(item.productId) === String(productId) &&
      item.frameSize === frameSize &&
      item.frameColor === frameColor &&
      item.themeColor === themeColor &&
      item.customText === customText &&
      JSON.stringify(item.uploadedImageFiles) === JSON.stringify(uploadedImageFiles)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (parseInt(quantity) === 0) {
      const deletedItem = user.cartData[itemIndex];
      console.log(deletedItem);
      
      if (deletedItem.uploadedImageFiles && deletedItem.uploadedImageFiles.length > 0) {
        deletedItem.uploadedImageFiles.forEach(file => {
          const fullPath = path.join(__dirname, "..",  file); 
          
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }
     user.cartData.splice(itemIndex, 1);
    } else {
      
      user.cartData[itemIndex].quantity = parseInt(quantity);
    }

    await user.save();

    res.status(200).json({
      message: "Cart updated successfully",
      cartData: user.cartData
    });

  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export  { addToCart, getCartData, updateCart };