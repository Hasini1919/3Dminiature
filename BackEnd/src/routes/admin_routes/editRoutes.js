import express from "express";
import {
  getProductById,
  updateProduct,
  uploadEditImages,
  deleteProduct
} from "../../controllers/admin_controller/editController.js";




const router = express.Router();

router.get("/product/:id", getProductById);
router.put("/product/:id", uploadEditImages, updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
