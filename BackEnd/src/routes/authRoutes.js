import express from 'express';
import passport from 'passport';
import { 
    signup, 
    login, 
    googleCallback, 
    getCurrentUser,
    forgotPassword,
    resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', resetPassword);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleCallback
);

router.get('/me', getCurrentUser);

export default router;