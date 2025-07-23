import express from "express";
import upload from "../middleware/multer.js";
import {
  uploadImages,
  getProductDetailsById,
} from "../controllers/productDetailsController.js";

const router = express.Router();

// POST /api/product-details/upload
router.post("/upload", upload.array("images", 5), uploadImages);

// GET /api/product-details/:id
router.get("/:id", getProductDetailsById);

export default router;
