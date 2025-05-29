import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

let isConnected;

const database = async () => {
  if (isConnected) {
    console.log("Database Connected!");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log("Database Connected!!!");
  } catch (error) {
    console.error("Database Not Connected", error);
  }
};

export default database;
