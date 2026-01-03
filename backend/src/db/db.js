import mongoose from "mongoose";

// console.log(`${DB_URI}/${DB_NAME}`);

export const connectDB = async () => {
  const DB_URI = process.env.DB_URI;
  const DB_NAME = process.env.DB_NAME;

  console.log(`${DB_URI}/${DB_NAME}`);
  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection Error:", error.message);
    console.error(error);
  }
};
