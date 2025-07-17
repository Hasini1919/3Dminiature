import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

// import multer from "multer";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";;
import addRoutes from "./routes/admin_routes/add_order.js";

////////////////////////////////////////////////////////////////////////

import orderRoutes from './routes/admin_routes/orders.js';
import pendingRoutes from './routes/admin_routes/pending.js'
import comRoutes from './routes/admin_routes/completed.js'
import customRoutes from './routes/admin_routes/customer.js'
import newStatsRoutes from './routes/admin_routes/newstats.js'
import pendingStatsRoutes from './routes/admin_routes/pendingstats.js'
import comStatsRoutes from './routes/admin_routes/comstats.js'
import customerstatsRoutes from './routes/admin_routes/cutomerstats.js'
import notificationRoutes from './routes/admin_routes/notification.js'

/////////////////////////////////////////////////////////////////////////////
import addressRoutes from "./routes/address-routes.js";
import cartRouter from "./routes/cart-routes.js";
import productRoutes from "./routes/product-routes.js";
import couponRouter from "./routes/coupon-routes.js";
import orderRouter from "./routes/order-routes.js";
import uploadRouter from "./routes/userimage-routes.js";
import "./config/passport.js";

/////////////////////////////////////////////////////////////////////////////
import editRoutes from "./routes/admin_routes/editRoutes.js";

// Load environment variables


// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app
const app = express();

// MongoDB connection (use only one)
connectDB();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  credentials: true
}));
app.use(passport.initialize());

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


// Routes



app.use("/api/auth", authRoutes);
app.use("/form", addRoutes);
app.use("/api/cart", cartRouter);
app.use("/api", addressRoutes);
app.use("/api/admin", productRoutes);
app.use("/api/apply", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api", uploadRouter);

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5002;
// // Initialize upload
// const upload = multer({ storage });

// Serve static files (uploaded images)
app.use("/uploads", express.static(path.join(process.cwd(),"src/uploads")));

app.use("/form",addRoutes);


///////////////////////////////////////////////////////////////////////////////////


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

app.use("/", editRoutes);


///////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(" Google OAuth is ready if configured");
});