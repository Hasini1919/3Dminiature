import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';

// import multer from "multer";
import { promises as fsPromises, constants } from "fs";
import mime from "mime-types";
import { fileURLToPath } from "url";
import multer from 'multer';
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

// Route imports
import productroutes from "./routes/productRoute.js";
import productDetailsRoute from "./routes/productDetailsRoute.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import addRoutes from './routes/admin_routes/add_order.js';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

import orderRoutes from './routes/admin_routes/orders.js';
import pendingRoutes from './routes/admin_routes/pending.js'
import comRoutes from './routes/admin_routes/completed.js'
// import customRoutes from './routes/admin_routes/customer.js'
// import newStatsRoutes from './routes/admin_routes/newstats.js'
// import pendingStatsRoutes from './routes/admin_routes/pendingstats.js'
// import comStatsRoutes from './routes/admin_routes/comstats.js'
// import customerstatsRoutes from './routes/admin_routes/cutomerstats.js'
import notificationRoutes from './routes/admin_routes/notification.js'

import facebookAuthRoutes from './routes/facebookAuthRoutes.js';
import instagramAuthRoutes from './routes/instagramAuthRoutes.js';
import setupFacebookStrategy from './config/facebookStrategy.js'; 
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/User.js';import addressRoutes from "./routes/address-routes.js";
import cartRouter from "./routes/cart-routes.js";
import productRoutes from "./routes/product-routes.js";
import couponRouter from "./routes/coupon-routes.js";
import orderRouter from "./routes/order-routes.js";
import uploadRouter from "./routes/userimage-routes.js";
import  "./config/passport.js";
import { routes as enquiryRoutes } from './routes/enquiryRoutes.js';
import { routes as subscribeRoutes } from './routes/subscribeRoutes.js';
import  imageRoutes  from './routes/imageRoutes.js';
import { routes as pdfRoutes } from './routes/pdfRoutes.js';

/////////////////////////////////////////////////////////////////////////////
import editRoutes from "./routes/admin_routes/editRoutes.js";


////////////////////testing

 import orderRoute from "./routes/admin_routes/testing/new_Order.js";
 import customersRoutes from "./routes/admin_routes/customer.js";
 import dashboardRoute from "./routes/admin_routes/testing/dashboardroutes.js";
 import couponRoutes from "./routes/admin_routes/testing/create_coup.js";
//  import couponRoute from "./routes/admin_routes/testing/coupon_routes.js";
//  import coupRoutes from "./routes/admin_routes/testing/create_coup.js";
import adRoutes from './routes/admin_routes/advertRoutes.js';
import adminProfileRoutes from './routes/admin_routes/admin_profile.js';
import dyn_orderRoutes from "./routes/admin_routes/orderdynamic_rout.js";


/////////////////////////////finish

import feedbackRoutes from './routes/feedback-routes.js';
import checkoutRoutes from './routes/checkout.js'
// Load environment variables


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5500;

setupFacebookStrategy(passport);

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5500/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  // ... your google strategy code
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

const app = express();

const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(passport.initialize());

// Static folders
app.use('/uploads', express.static(uploadDir));
app.use('/src', express.static(path.join(__dirname, "src")));
app.use('/images', express.static(path.join(__dirname, '../src/products')));
app.use('/products', express.static(path.join(__dirname, 'products')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mine routes
app.use('/api', dashboardRoute);
app.use('/form', addRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/', editRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/orders', orderRoute); //new-order full order table
app.use('/api/orders', orderRoutes);  // status - order placed
app.use('/api/orders', pendingRoutes); // status - Processing
app.use('/api/orders', comRoutes); // status - Completed 
app.use('/api/orders', dyn_orderRoutes); // check one order details
app.use('/api/customers', customersRoutes); // customer full details
app.use('/api/notifications', notificationRoutes); // notification
app.use('/api/admin/profile', adminProfileRoutes); // profile


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////end............

// Routes - all your route uses here













app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRouter);
app.use('/api', addressRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/apply', couponRouter);
app.use('/api/order', orderRouter);
app.use('/api', uploadRouter);
app.use(enquiryRoutes);
app.use(subscribeRoutes);
app.use('/api', imageRoutes);
app.use(pdfRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/auth', instagramAuthRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});


// Image serving with security (your existing handler here)
app.get("/products/:folderName/:imageName", async (req, res) => {
  // ... your secure image serving code here
});

// Error handler middleware (your existing code)
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// Server start function
async function startServer() {
  try {
    await connectDB();
    const productsDir = path.join(__dirname, "products");
    await fsPromises.mkdir(productsDir, { recursive: true });
    console.log(`Product images directory ready: ${productsDir}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
      console.log("Google OAuth is configured and ready");
    });
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
}

// Process event handlers
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Start server
await startServer();