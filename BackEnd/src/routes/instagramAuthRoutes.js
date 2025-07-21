import express from 'express';
import passport from 'passport';
import { instagramCallback } from '../controllers/instagramAuthController.js';

const router = express.Router();

router.get('/instagram',
  passport.authenticate('instagram')
);

router.get('/instagram/callback',
  passport.authenticate('instagram', { session: false }),
  instagramCallback
);

export default router;