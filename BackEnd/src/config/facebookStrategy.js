import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import User from '../models/User.js';

const FACEBOOK_APP_ID = process.env.FB_APP_ID;
const FACEBOOK_APP_SECRET = process.env.FB_APP_SECRET;

export default (passport) => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5500/api/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });

      if (!user) {
        const email = profile.emails?.[0]?.value;
        if (email) {
          user = await User.findOne({ email });
        }

        if (user) {
          user.facebookId = profile.id;
          user.picture = profile.photos?.[0]?.value;
          await user.save();
        } else {
          user = await User.create({
            facebookId: profile.id,
            name: profile.displayName || `${profile.name?.givenName} ${profile.name?.familyName}`,
            email: profile.emails?.[0]?.value,
            picture: profile.photos?.[0]?.value
          });
        }
      }
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
};