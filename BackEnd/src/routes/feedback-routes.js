import express from 'express';
import { submitFeedback } from '../controllers/feedback-controller.js';
import Auth from '../middleware/auth.js';

const router = express.Router();


router.post('/', Auth, submitFeedback);

export default router;
