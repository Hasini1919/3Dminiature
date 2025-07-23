import express from "express";
import { getUserReviews } from "../controllers/reviewHistoryController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/my-reviews", auth, getUserReviews);

export default router;
