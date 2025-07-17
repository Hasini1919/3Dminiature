import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import addRoutes from './routes/admin_routes/add_order.js';
import facebookAuthRoutes from './routes/facebookAuthRoutes.js';
import instagramAuthRoutes from './routes/instagramAuthRoutes.js';
import setupFacebookStrategy from './config/facebookStrategy.js'; 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';

dotenv.config();

// Log for debug
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('FB_APP_ID:', process.env.FB_APP_ID);

// ✅ Setup Facebook Passport strategy
setupFacebookStrategy(passport);

// ✅ Setup Google Passport strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5500/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
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

// ✅ Serialize/deserialize user (session optional)
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

connectDB();

const app = express();

const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected successfully');

    app.use(cors({
      origin: 'http://localhost:3000',
      methods: 'GET,POST,PUT,PATCH,DELETE',
      credentials: true
    }));

    app.use(express.json());
    app.use(passport.initialize());

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/auth', facebookAuthRoutes);

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    // Ensure uploads folder exists
    const uploadDir = path.join(process.cwd(), 'src/uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    app.use('/uploads', express.static(uploadDir));
    app.use('/form', addRoutes);
    app.use('/api/auth', instagramAuthRoutes);

    const PORT = 5500;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log('✅ Facebook and Google OAuth strategies configured.');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
  }
};

startServer();
