import express from "express";
import { getProducts } from "../controllers/filterController.js";
import { Router } from "express";

const router = Router();

// Request logging middleware
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  console.log("Query Parameters:", req.query);
  next();
});

// Use the unified filter controller
router.get("/", getProducts);

export default router;
