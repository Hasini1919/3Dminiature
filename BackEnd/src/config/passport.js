
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';


const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5008/api/auth/google/callback",
    scope: ['profile', 'email']
},
async function(accessToken, refreshToken, profile, done) {
    try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
            // Check if user exists with same email
            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
                // Update existing user with Google ID
                user.googleId = profile.id;
                user.picture = profile.photos[0].value;
                await user.save();
            } else {
                // Create new user
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    picture: profile.photos[0].value
                });
            }
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

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
