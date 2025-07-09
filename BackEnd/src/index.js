import express from "express";
import DB_Connection from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import addressRoutes from "./routes/address-routes.js";
import cartRouter from "./routes/cart-routes.js";
import routers from "./routes/product-routes.js";
import couponRouter from "./routes/coupon-routes.js";
import orderRouter from "./routes/order-routes.js";
import UploadRouter from "./routes/userimage-routes.js";

const app=express();
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); 
app.use(express.json());


app.use(cors({
    origin: "http://localhost:3001", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }));


DB_Connection();
app.use("/uploads", express.static("uploads"));
app.use("/api/cart",cartRouter);
app.use("/api",addressRoutes);
app.use("/api/admin",routers);
app.use("/api/apply",couponRouter);
app.use("/api/order",orderRouter);
app.use('/api',  UploadRouter);


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});