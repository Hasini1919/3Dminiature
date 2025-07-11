import express from 'express';
import { getProducts } from'../controllers/filterController.js'; 
import { Router } from "express";

const router = Router();

// Debugging middleware (Check if API route is hit)
router.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} hit`);
  next();
});

// Route to get all products with filters
router.get('/products', getProducts);  

export default router;
