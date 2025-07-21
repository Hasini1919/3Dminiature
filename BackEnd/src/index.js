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

////////////////////////////////////////////////////////////////////////

import orderRoutes from './routes/admin_routes/orders.js';
import pendingRoutes from './routes/admin_routes/pending.js'
import comRoutes from './routes/admin_routes/completed.js'
// import customRoutes from './routes/admin_routes/customer.js'
// import newStatsRoutes from './routes/admin_routes/newstats.js'
// import pendingStatsRoutes from './routes/admin_routes/pendingstats.js'
// import comStatsRoutes from './routes/admin_routes/comstats.js'
// import customerstatsRoutes from './routes/admin_routes/cutomerstats.js'
import notificationRoutes from './routes/admin_routes/notification.js'

/////////////////////////////////////////////////////////////////////////////
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


// Log for debug
// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5500;

setupFacebookStrategy(passport);


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


const app = express();


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
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true
}));
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(passport.initialize());

////////////////////////////////////////////////////////////////////////////////////////////////////mine


app.use('/api/notifications',notificationRoutes)
app.use("/", editRoutes);
app.use("/form",addRoutes);
app.use('/api/orders',orderRoutes)
app.use('/api/updates',pendingRoutes)
app.use('/api/updates',comRoutes)
app.use("/api/orders", orderRoute);
app.use("/api/customers", customersRoutes);
app.use("/api", dashboardRoute);
app.use("/api/coupons", couponRoutes);
app.use("/src", express.static(path.join(__dirname, "src")));
app.use('/api/ads', adRoutes);
app.use('/images', express.static(path.join(__dirname, '../src/products')));
app.use('/api/admin/profile', adminProfileRoutes);
app.use("/api/orders", dyn_orderRoutes);




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mine end

// Ensure "uploads" directory exists
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

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

app.use('/products', express.static(path.join(__dirname, 'products')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/products", productroutes);
app.use("/api/product-details", productDetailsRoute);
app.use("/api/ads", advertisementRoutes);
//app.use("/api/auth", authRoutes);
app.use("/form", addRoutes);
app.use("/api/auth", authRoutes);
//app.use("/form", addRoutes);
app.use("/api/cart", cartRouter);
app.use("/api", addressRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/apply", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api", uploadRouter);
app.use(enquiryRoutes);
app.use(subscribeRoutes);
app.use("/api",imageRoutes);
app.use(pdfRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/checkout', checkoutRoutes);


// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});




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
      await fsPromises.access(imagePath, constants.R_OK);
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

// Start server


// Server initialization
async function initializeServer() {
  try {
    const productsDir = path.join(__dirname, "products");
    await fsPromises.mkdir(productsDir, { recursive: true });
    console.log(`Product images directory ready: ${productsDir}`);

// // Initialize upload
// const upload = multer({ storage });

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(process.cwd(),"src/uploads")));




///////////////////////////////////////////////////////////////////////////////////



// app.use('/api',customRoutes) ////////////////////////////////////////////////////////////////////////////////////

// app.use('/api/order-stats',newStatsRoutes);

// app.use('/api/pending-stats',pendingStatsRoutes);

// app.use('/api/completed-stats',comStatsRoutes);

// app.use('/api/customer',customerstatsRoutes);

// app.use('/api/orders-completed',comStatsRoutes);




///////////////////////////////////////////////////////

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



// Routes



    app.use('/uploads', express.static(uploadDir));
    app.use('/form', addRoutes);
    app.use('/api/auth', instagramAuthRoutes);

   
    app.listen(PORT, () => {
      console.log(` Server running at http://localhost:${PORT}`);
      console.log('Facebook and Google OAuth strategies configured.');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();


{/*}
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
*/}
{/*
// Ensure "uploads" directory exists
app.use('/api/auth', authRoutes);
// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
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

// Serve uploaded images
app.use("/uploads", express.static(uploadDir));
app.use("/products", express.static(path.join(__dirname, "products")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

    
 {/*}   
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fsSync.existsSync(uploadDir)) {
  fsSync.mkdirSync(uploadDir, { recursive: true });
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
{/*
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
*/}
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

