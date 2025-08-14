import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI ?? "";

export const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Database connected ✅");
  } catch (error) {
    console.log("Error connecting database ❌: ", error);
    process.exit(1);
  }
};
