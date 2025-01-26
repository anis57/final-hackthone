import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const DbConnecting = async()=>{
    try {
        await mongoose.connect(MONGODB_URI)
        console.log("database Connected successfully");
    } catch (error) {
        console.log("database not Connected");
    }
}

export default DbConnecting;