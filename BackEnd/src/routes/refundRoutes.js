import express from "express";
import { createRefundRequest } from "../controllers/refundController.js";

const router = express.Router();

router.post("/refund", createRefundRequest);

export default router;
