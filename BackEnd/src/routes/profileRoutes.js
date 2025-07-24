// routes/profileRoutes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

import profileAuth from "../middleware/profile.js";
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
router.route("/").get(profileAuth, getProfile).put(profileAuth, updateProfile);

// Address Routes
router
  .route("/addresses")
  .get(profileAuth, getAddresses)
  .post(profileAuth, addAddress);

router
  .route("/addresses/:id")
  .put(profileAuth, updateAddress)
  .delete(profileAuth, deleteAddress);

router.put("/addresses/default/:id", profileAuth, setDefaultAddress);

// ✅ Profile Image Upload Route
router.post(
  "/upload-image/:userId",
  profileAuth,
  upload.single("image"),
  uploadProfileImage
);

export default router;