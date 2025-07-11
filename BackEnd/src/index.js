
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
// import multer from "multer";
import path from "path";
// import fs from "fs";
import dotenv from 'dotenv';
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


dotenv.config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);

connectDB();

const app = express();



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






// // Ensure "uploads" directory exists
// const uploadDir = path.join(process.cwd(), "src/uploads");
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir); // Save files in the "uploads" folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname);
//     },
// });


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


///////////////////////////////////////////////////////

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Google OAuth is configured and ready');
});

































// app.use(bodyParser.json());

//routes


// app.get("/" ,(req , res) => {
//     res.send("Express backend is running");


// app.listen(PORT ,() =>{
//     console.log(`Backend server running on http://localhost:${PORT}`);
// });







