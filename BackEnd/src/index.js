// File: src/server.js (or index.js)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import addRoutes from "./routes/admin_routes/add_order.js";
import addressRoutes from "./routes/address-routes.js";
import cartRouter from "./routes/cart-routes.js";
import productRoutes from "./routes/product-routes.js";
import couponRouter from "./routes/coupon-routes.js";
import orderRouter from "./routes/order-routes.js";
import uploadRouter from "./routes/userimage-routes.js";
import "./config/passport.js";
import feedbackRoutes from './routes/feedback-routes.js';
import checkoutRoutes from './routes/checkout.js'
// Load environment variables
dotenv.config();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();

// MongoDB connection (use only one)
import connectDB from "./config/db.js"; // or admin_config/db.js if needed
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve uploaded images
app.use("/uploads", express.static(uploadDir));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });
{/*
    
    
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});


*/ }

// Routes



app.use("/api/auth", authRoutes);
app.use("/form", addRoutes);
app.use("/api/cart", cartRouter);
app.use("/api", addressRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/apply", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api", uploadRouter);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/checkout', checkoutRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(" Google OAuth is ready if configured");
});