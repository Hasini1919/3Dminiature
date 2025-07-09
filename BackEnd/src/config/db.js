import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const DB_Connection =async()=>{
    try{
        const connection= await mongoose.connect( process.env.DB_URL);
        //console.log(connection);
        console.log("Mongodb connection successful");
    }
    catch(error){
        console.log(error);
    }
}

export default DB_Connection;