import express from 'express';
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { routes as enquiryRoutes } from './routes/enquiryRoutes.js';
import { routes as subscribeRoutes } from './routes/subscribeRoutes.js';
import { routes as imageRoutes } from './routes/imageRoutes.js';
import { routes as pdfRoutes } from './routes/pdfRoutes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /products directory
app.use('/products', express.static(path.join(__dirname, 'products')));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Routes
app.use(enquiryRoutes);
app.use(subscribeRoutes);
app.use(imageRoutes);
app.use(pdfRoutes);


const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
