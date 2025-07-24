import express from "express";
import {
  addToWishlist,
  getWishlistCount,
  getWishlistProducts,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/add", addToWishlist);
router.get("/count/:userId", getWishlistCount);
router.get("/products/:userId", getWishlistProducts);
router.post("/remove", removeFromWishlist);

export default router;
