// routes/imageRoutes.js
import express from "express";
import  getAllImages  from "../controllers/image-controller.js";

const router = express.Router();

router.get("/images", getAllImages);

export default router; 

