import express from "express";
import {
  getProducts,
  getProductWithAd,
} from "../controllers/filterController.js";

const router = express.Router();

// Request logging middleware
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  console.log("Query Parameters:", req.query);
  next();
});

// Use the unified filter controller
router.get("/", getProducts);
router.get("/:id", getProductWithAd);
export default router;
