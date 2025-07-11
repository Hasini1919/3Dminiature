import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { promises as fs, constants } from "fs";
import mime from "mime-types";
import { fileURLToPath } from "url";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// Route imports
import filterRoute from "./routes/filterRoute.js";
import productRoutes from "./routes/productRoute.js";
import productDetailsRoute from "./routes/productDetailsRoute.js";
import advertisementRoutes from "./routes/advertisementRoutes.js";

// ES Modules equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to MongoDB
await connectDB();

// Enhanced CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3500",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// API Routes
app.use("/api/filters", filterRoute);
app.use("/api/products", productRoutes);
app.use("/api/product-details", productDetailsRoute);
app.use("/api/ads", advertisementRoutes);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const folderName = req.params.folderName || uuidv4();
    const uploadDir = path.join(__dirname, "products", folderName);
    
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Image upload endpoint
app.post('/api/products/:folderName/images', upload.array('images', 5), async (req, res) => {
  try {
    const folderName = req.params.folderName;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        error: "No files uploaded"
      });
    }

    const imageUrls = files.map(file => ({
      url: `/products/${folderName}/${file.filename}`,
      filename: file.filename,
      path: file.path
    }));

    return res.status(201).json({
      success: true,
      message: "Images uploaded successfully",
      folderName,
      images: imageUrls
    });
  } catch (err) {
    console.error("Image upload error:", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});

// Image serving endpoint with security enhancements
app.get("/products/:folderName/:imageName", async (req, res) => {
  try {
    const { folderName, imageName } = req.params;
    const imageDir = path.join(__dirname, "products", folderName);

    // Security checks
    if (!imageName || !/^[a-zA-Z0-9\-_.]+$/.test(imageName) || 
        !folderName || !/^[a-zA-Z0-9\-_]+$/.test(folderName)) {
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
const PORT = process.env.PORT || 5500;

async function initializeServer() {
  try {
    const productsDir = path.join(__dirname, "products");
    await fs.mkdir(productsDir, { recursive: true });
    console.log(`Product images directory ready: ${productsDir}`);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (err) {
    console.error("Failed to initialize server:", err);
    process.exit(1);
  }
}

// Graceful shutdown
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