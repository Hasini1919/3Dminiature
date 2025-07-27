import { Strategy as InstagramStrategy } from 'passport-instagram';
import User from '../models/User.js';

const configureInstagramStrategy = (passport) => {
  passport.use(new InstagramStrategy({
    clientID: process.env.INSTAGRAM_APP_ID,
    clientSecret: process.env.INSTAGRAM_APP_SECRET,
    callbackURL: "http://localhost:5500/api/auth/instagram/callback",
    scope: ['user_profile', 'user_media'],
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ instagramId: profile.id });

      if (!user) {
        user = await User.create({
          instagramId: profile.id,
          name: profile.displayName || profile.username || 'Instagram User',
          picture: profile._json?.profile_picture || null,
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }));
};

export default configureInstagramStrategy;