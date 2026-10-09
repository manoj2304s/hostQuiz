import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Started to connect.....");
    });
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`mongodb connection is successful ${conn.connection.host}`);
  } catch (err) {
    console.error(`connection erupted: ${err}`);
    process.exit(1);
  }
};

export default connectDB;
