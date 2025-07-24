import express from 'express';
import passport from 'passport';
import { 
    signup, 
    login, 
    googleCallback, 
    getCurrentUser,
    forgotPassword,
    resetPassword,
    facebookCallback 
} from '../controllers/authController.js';
import authUser from "../middleware/auth.js";
const router = express.Router();

// Existing routes (unchanged)
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', authUser,getCurrentUser);

// Google routes (unchanged)
// Google routes (unchanged)
router.get('/google',
    passport.authenticate('google', 
        { scope: ['profile', 'email'],
            prompt: 'consent'
            
         })
        

);
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    googleCallback
);


// NEW: Facebook routes
router.get('/facebook',
    passport.authenticate('facebook',
         { scope: ['email', 'public_profile'],
            authType: 'reauthenticate'      //This forces Facebook to re-prompt login
          })
);
router.get('/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    facebookCallback
);

// Instagram routes
router.get('/instagram',
    passport.authenticate('instagram', { scope: ['user_profile'] })
);

router.get('/instagram/callback',
    passport.authenticate('instagram', { session: false }),
    (req, res) => {
        // You can customize this
        res.json({ message: 'Instagram login success', user: req.user });
    }
);

export default router;