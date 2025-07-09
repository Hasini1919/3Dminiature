import express from 'express';
import cors from "cors";
//import bodyParser from 'body-parser';
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

// mongoDB connection
import connectDB from './config/Admin_config/db.js';

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
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

//connect Mongo
connectDB();

// Ensure "uploads" directory exists
const uploadDir = path.join(process.cwd(), "src/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}



// connect frontend
app.use(cors({
    origin: process.env.CLIENT_URL, // Allow requests from frontend
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Body parser (built-in in Express 4.16+)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/" ,(req , res) => {
    res.send("Express backend is running");
});

app.listen(PORT ,() =>{
    console.log(`Backend server running on http://localhost:${PORT}`);
});


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