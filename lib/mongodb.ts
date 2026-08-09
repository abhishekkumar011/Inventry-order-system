import mongoose from "mongoose";
import { setServers } from "node:dns/promises";

//I used this because i face problem with DNS of my local machine
setServers(["1.1.1.1", "8.8.8.8"]);

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env.local");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
};

export default connectDB;