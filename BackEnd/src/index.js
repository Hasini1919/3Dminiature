// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // .js required in ES modules
import userRoutes from './routes/userRoutes.js'; // .js required

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
