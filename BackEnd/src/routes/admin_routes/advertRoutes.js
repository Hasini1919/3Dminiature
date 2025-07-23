import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Advertisement from '../../models/Advertisement.js';
import Product from '../../models/Admin_models/Product.js';

const router = express.Router();

// Folder to save images
const adImageFolder = path.join('src/products/advertisement');
fs.mkdirSync(adImageFolder, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, adImageFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const safeFilename = `${Date.now()}-${baseName.replace(/\s+/g, '_')}${ext}`;
    cb(null, safeFilename);
  }
});
const upload = multer({ storage });

/**
 * POST /api/ads
 * Create or update ad (auto fallback image if needed)
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productId, title, mainTitle, discountPercentage, expiresAt } = req.body;
    let imagePath;

    if (req.file) {
      // Uploaded image path
      imagePath = `advertisement/${req.file.filename}`;
    } else {
      // Fallback: get image from product
      const product = await Product.findById(productId);
      if (!product || !product.images?.length) {
        return res.status(400).json({ message: "No image uploaded and product has no image." });
      }
      imagePath = product.images[0]; // Assuming it's already a relative path
    }

    const advertisement = await Advertisement.findOneAndUpdate(
      { product: productId },
      {
        title,
        mainTitle,
        discountPercentage,
        expiresAt,
        img: imagePath,
        product: productId,
        isActive: true,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Advertisement saved successfully', advertisement });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/ads/:productId
 * Fetch advertisement for a product
 */
router.get('/:productId', async (req, res) => {
  try {
    const ad = await Advertisement.findOne({ product: req.params.productId });

    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ advertisement: ad });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/ads/:productId
 * Delete advertisement and its image file
 */
router.delete('/:productId', async (req, res) => {
  try {
    const deletedAd = await Advertisement.findOneAndDelete({ product: req.params.productId });

    if (!deletedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    const absolutePath = path.join('src/products', deletedAd.img);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    res.status(200).json({ message: 'Advertisement removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
