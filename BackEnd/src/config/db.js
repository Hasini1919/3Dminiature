import mongoose from 'mongoose';

const connectDB = async () => {
    try {
<<<<<<< HEAD
        const conn = await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
=======

      const conn = await mongoose.connect(process.env.DB_URL);
>>>>>>> 04822994240910ba8e7a0a432fa0e571aa39d071
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
