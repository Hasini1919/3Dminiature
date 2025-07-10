

import dotenv from 'dotenv';
dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

connectDB();

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true
// }));
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Google OAuth is configured and ready');
});

// import express from 'express';
// import cors from "cors";
//import bodyParser from 'body-parser';
// import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

// mongoDB connection
import connectDB from './config/admin_config/db.js';

//route files
import addRoutes from "./routes/admin_routes/add_order.js";

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


const PORT = process.env.PORT || 5500;

//connect Mongo
connectDB();

// Ensure "uploads" directory exists
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}



// connect frontend


// Body parser (built-in in Express 4.16+)
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Initialize upload
const upload = multer({ storage });

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadDir));

// app.use(bodyParser.json());

//routes
app.use("/form",addRoutes);

// app.get("/" ,(req , res) => {
//     res.send("Express backend is running");
});

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

import express from "express";
import DB_Connection from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import addressRoutes from "./routes/address-routes.js";
import cartRouter from "./routes/cart-routes.js";
import routers from "./routes/product-routes.js";
import couponRouter from "./routes/coupon-routes.js";
import orderRouter from "./routes/order-routes.js";
import UploadRouter from "./routes/userimage-routes.js";




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
DB_Connection();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/cart", cartRouter);
app.use("/api", addressRoutes);
app.use("/api/admin", routers);
app.use("/api/apply", couponRouter);
app.use("/api/order", orderRouter);
app.use("/api", UploadRouter);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
