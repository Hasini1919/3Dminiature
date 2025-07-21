import fs from "fs";
import path from "path";
import multer from "multer";
import Product from "../../models/Admin_models/Product.js";

// Multer storage configuration to save files under 'products/ProductName' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productName = req.body.name || "default";
    const uploadPath = path.join("src/products", productName);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploadEditImages = multer({ storage }).array("newImages", 10);

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update product including image management and folder rename if product name changes
export const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      frameSize,
      frameColor,
      themeColor,
      deletedImages,
    } = req.body;

    const parsedDeleted = JSON.parse(deletedImages || "[]");

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // If product name changed, rename the folder on disk
    if (product.name !== name) {
      const oldFolder = path.join("src/products", product.name);
      const newFolder = path.join("src/products", name);
      if (fs.existsSync(oldFolder) && !fs.existsSync(newFolder)) {
        fs.renameSync(oldFolder, newFolder);
      }
    }

    // Folder path on disk for images of current product name (after rename if any)
    const imageFolder = path.join("src/products", name);

    // Filter out deleted images from the existing image list
    const updatedImages = product.images.filter(
      (img) => !parsedDeleted.includes(img)
    );

    // Delete files from disk for deleted images
    parsedDeleted.forEach((imgName) => {
      const fullPath = path.join(imageFolder, path.basename(imgName));
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    });

    // Save new uploaded images (paths stored relative to 'products/')
    const newImageNames = (req.files || []).map(
      (file) => `${name}/${file.filename}`
    );

    // Final combined images list
    const finalImages = [...updatedImages, ...newImageNames];

    // Update product document in DB
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        description,
        frameSize: JSON.parse(frameSize),
        frameColor: JSON.parse(frameColor),
        themeColor: JSON.parse(themeColor),
        images: finalImages,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Update failed" });
  }
};

// Delete product and images folder
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Delete product images folder on disk
    const folderPath = path.join("src/products", product.name);
    if (fs.existsSync(folderPath)) {
      fs.rmSync(folderPath, { recursive: true, force: true });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
