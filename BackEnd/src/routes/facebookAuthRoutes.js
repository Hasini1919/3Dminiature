import express from 'express';
import passport from 'passport';
import { facebookCallback } from '../controllers/facebookAuthController.js';

const router = express.Router();

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  facebookCallback
);

export default router;