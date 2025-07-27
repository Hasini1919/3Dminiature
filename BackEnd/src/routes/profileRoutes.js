// routes/profileRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import auth from "../middleware/auth.js";
import {
  getProfile,
  updateProfile,
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  uploadProfileImage,
} from "../controllers/profileController.js";

const router = express.Router();

// Create destination directory if it doesn't exist
const uploadDir = "uploads/profile";
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  }
});

const upload = multer({ storage });
// Profile Routes
router.route("/").get(auth, getProfile).put(auth, updateProfile);

// Address Routes
router.route("/addresses").get(auth, getAddresses).post(auth, addAddress);

router
  .route("/addresses/:id")
  .put(auth, updateAddress)
  .delete(auth, deleteAddress);

router.put("/addresses/default/:id", auth, setDefaultAddress);

// ✅ Profile Image Upload Route
router.post(
  "/upload-image/:userId",
  auth,
  upload.single("image"),
  uploadProfileImage
);

export default router;