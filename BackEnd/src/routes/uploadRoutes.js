// src/routes/uploadRoutes.js for customer profile
import express from 'express';
import multer from 'multer';
import { uploadProfileImage, getProfileImage } from '../controllers/profileController.js';

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Image upload
router.post('/upload-image/:userId', upload.single('image'), uploadProfileImage);
router.get('/profile-image/:userId', getProfileImage);

export default router;
