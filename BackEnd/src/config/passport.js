// passport-config.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import configureInstagramStrategy from '../config/instagramStrategy.js'; 
import User from '../models/User.js';


configureInstagramStrategy(passport);

// 🔐 Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5500/api/auth/google/callback",
    scope: ['profile', 'email'],
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            const email = profile.emails?.[0]?.value;

            if (email) {
                user = await User.findOne({ email });
            }

            if (user) {
                user.googleId = profile.id;
                user.picture = profile.photos?.[0]?.value;
                await user.save();
            } else {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email,
                    picture: profile.photos?.[0]?.value,
                });
            }
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// 🔵 Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: "http://localhost:5500/api/auth/facebook/callback",
    profileFields: ['id', 'email', 'name', 'displayName', 'photos'],
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
                    email,
                    picture: profile.photos?.[0]?.value,
                });
            }
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// ✅ Serialize / Deserialize
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export default passport;