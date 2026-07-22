import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/momofullstack");
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Database connection failed", error?.message);
  }
};

export default connectDB;
