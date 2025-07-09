import express from 'express';
import upload from "../middleware/upload-middleware.js";
import { getProducts, addProducts } from '../controllers/productsearch-controller.js';


const router = express.Router();

// API: Upload Product with Image
router.post('/addProduct', upload.single('imageUrl'), addProducts );

// API: Get All Products
router.get('/products', getProducts);

export default router;