import express from 'express';
import getUserAddress from '../controllers/user-controller.js';
import authUser from "../middleware/auth.js";

const router = express.Router();

router.get('/get-address', authUser, getUserAddress);

export default router;