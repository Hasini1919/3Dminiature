import express from "express";
import upload from "../middleware/multer.js";
import {
  addReview,
  getReviewsByProduct,
} from "../controllers/reviewController.js";

const router = express.Router();

// Routes
router.post("/add", upload.array("images", 5), addReview);
router.get("/product/:productId", getReviewsByProduct);

export default router;
