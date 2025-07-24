import express from "express";
import { getReviewHistory } from "../controllers/reviewHistoryController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getReviewHistory);

export default router;