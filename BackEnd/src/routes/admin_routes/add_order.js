// routes/ProductRoutes.js
import express from "express";
import upload from "../../middleware/admin_middleware/uploadsFrame.js";
import { addProduct, getAllProducts } from "../../controllers/admin_controller/addController.js";

const router = express.Router();

router.post("/", upload.array("images", 5), addProduct);
router.get("/", getAllProducts);

export default router;
