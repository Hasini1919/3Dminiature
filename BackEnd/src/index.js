import express from "express";
import cors from "cors";
import { promises as fs, constants } from "fs";
import fsSync from "fs";
import mime from "mime-types";
import { fileURLToPath } from "url";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import passport from "passport";
import path from "path";
import dotenv from "dotenv";

// Route imports
import filterRoute from "./routes/filterRoute.js";
import productRoutes from "./routes/productRoute.js";
import productDetailsRoute from "./routes/productDetailsRoute.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import addRoutes from "./routes/admin_routes/add_order.js";

// Load environment variables
dotenv.config();
console.log("GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;

// Connect to MongoDB
await connectDB();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(passport.initialize());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const folderName = req.params.folderName || uuidv4();
      const uploadDir = path.join(__dirname, "uploads", folderName);

      await fs.mkdir(uploadDir, { recursive: true });
      req.uploadDir = uploadDir; // store dir in request for reuse in filename if needed
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// Ensure "uploads" directory exists
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fsSync.existsSync(uploadDir)) {
  fsSync.mkdirSync(uploadDir, { recursive: true });
}

// API Routes
app.use("/api/filters", filterRoute);
app.use("/api/products", productRoutes);
app.use("/api/product-details", productDetailsRoute);
app.use("/api/ads", advertisementRoutes);
app.use("/api/auth", authRoutes);
app.use("/form", addRoutes);

// Image upload endpoint
app.post(
  "/api/uploads/:folderName/images",
  upload.array("images", 5),
  async (req, res) => {
    try {
      const folderName = req.params.folderName;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({
          success: false,
          error: "No files uploaded",
        });
      }

      const imageUrls = files.map((file) => ({
        url: `/uploads/${folderName}/${file.filename}`,
        filename: file.filename,
        path: file.path,
      }));

      return res.status(201).json({
        success: true,
        message: "Images uploaded successfully",
        folderName,
        images: imageUrls,
      });
    } catch (err) {
      console.error("Image upload error:", err);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

// Image serving endpoint with security enhancements
app.get("/products/:folderName/:imageName", async (req, res) => {
  try {
    const { folderName, imageName } = req.params;
    const imageDir = path.join(__dirname, "products", folderName);

    // Security checks
    if (
      !imageName ||
      !/^[a-zA-Z0-9\-_.]+$/.test(imageName) ||
      !folderName ||
      !/^[a-zA-Z0-9\-_]+$/.test(folderName)
    ) {
      return res.status(400).json({
        success: false,
        error: "Invalid image request",
      });
    }

    const imagePath = path.join(imageDir, imageName);

    // Check file exists and is accessible
    try {
      await fs.access(imagePath, constants.R_OK);
    } catch {
      return res.status(404).json({
        success: false,
        error: "Image not found",
      });
    }

    // Security: Prevent directory traversal
    const normalizedPath = path.normalize(imagePath);
    if (!normalizedPath.startsWith(path.join(__dirname, "products"))) {
      return res.status(403).json({
        success: false,
        error: "Access denied",
      });
    }

    // Set proper content type
    const mimeType = mime.lookup(imagePath) || "application/octet-stream";
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Security: Add caching headers
    res.setHeader("Cache-Control", "public, max-age=86400");

    return res.sendFile(imagePath);
  } catch (err) {
    console.error("Image serving error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadDir));

// Basic route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// Server initialization
async function initializeServer() {
  try {
    const productsDir = path.join(__dirname, "products");
    await fs.mkdir(productsDir, { recursive: true });
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

// Start the server
await initializeServer();

/*

import orderRoutes from './orders.js';

import pendingRoutes from './pending.js'

import comRoutes from './completed.js'

import customRoutes from './customer.js'
import newStatsRoutes from './newstats.js'
import pendingStatsRoutes from './pendingstats.js'
import comStatsRoutes from './comstats.js'
import customerstatsRoutes from './customerstats.js'

import notificationRoutes from './notification.js'

*/

// app.use(bodyParser.json());

//routes

// app.get("/" ,(req , res) => {
//     res.send("Express backend is running");

// app.listen(PORT ,() =>{
//     console.log(`Backend server running on http://localhost:${PORT}`);
// });

/*

app.use('/api/orders',orderRoutes)

app.use('/api/updates',pendingRoutes)

app.use('/api/updates',comRoutes)

app.use('/api',customRoutes)

app.use('/api/order-stats',newStatsRoutes);

app.use('/api/pending-stats',pendingStatsRoutes);

app.use('/api/completed-stats',comStatsRoutes);

app.use('/api/customer',customerstatsRoutes);

app.use('/api/orders-completed',comStatsRoutes);

app.use('/api/notifications',notificationRoutes)

*/
