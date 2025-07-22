import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Advertisement from '../../models/Advertisement.js';

const router = express.Router();

// Define the folder to save ad images
const adImageFolder = path.join('src/products/advertisement');
fs.mkdirSync(adImageFolder, { recursive: true });

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, adImageFolder);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext); // just the filename, no folder or extension
    const safeFilename = `${Date.now()}-${baseName.replace(/\s+/g, '_')}${ext}`;
    cb(null, safeFilename);
  }
});

const upload = multer({ storage });

/**
 * POST /api/ads
 * Create a new advertisement
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { productId, title, mainTitle, discountPercentage, expiresAt } = req.body;

    const relativeImagePath = `advertisement/${req.file.filename}`;

    const newAd = new Advertisement({
      product: productId,
      title,
      mainTitle,
      discountPercentage,
      expiresAt,
      img: relativeImagePath, // Save relative path
    });

    await newAd.save();
    res.status(201).json({ message: 'Ad created successfully', ad: newAd });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error saving ad' });
  }
});

/**
 * DELETE /api/ads/:productId
 * Delete advertisement by productId and remove its image file
 */
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedAd = await Advertisement.findOneAndDelete({ product: productId });

    if (!deletedAd) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    const absoluteImgPath = path.join('src/products', deletedAd.img);
    if (fs.existsSync(absoluteImgPath)) {
      fs.unlinkSync(absoluteImgPath);
    }

    res.status(200).json({ message: 'Advertisement removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/ads/:productId
 * Fetch ad for a given product
 */
router.get('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    const ad = await Advertisement.findOne({ product: productId });

    if (!ad) {
      return res.status(404).json({ message: 'Advertisement not found' });
    }

    res.status(200).json({ advertisement: ad });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
