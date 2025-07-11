import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import multer from "multer";
import path from "path";
import fs from "fs";
import dotenv from 'dotenv';
import addRoutes from "./routes/admin_routes/add_order.js";


dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

connectDB();

const app = express();

const startServer = async () => {
  try {
    await connectDB();  // Wait for DB connection here
    console.log('MongoDB connected successfully');

    app.use(cors({
        origin: 'http://localhost:3000',
        methods: "GET,POST,PUT,PATCH,DELETE",
        credentials: true
    }));
    app.use(express.json());
    app.use(passport.initialize());

    app.use('/api/auth', authRoutes);

    app.get('/', (req, res) => {
        res.send('API is running...');
    });

    // Ensure "uploads" directory exists
    const uploadDir = path.join(process.cwd(), "src/uploads");
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Serve static files (uploaded images)
    app.use("/uploads", express.static(uploadDir));

    app.use("/form", addRoutes);

    const PORT = 5500;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Google OAuth is configured and ready');
    });

  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
