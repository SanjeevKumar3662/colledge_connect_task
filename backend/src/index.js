import { configDotenv } from "dotenv";
configDotenv();

import cors from "cors";
import express from "express";

import { errorHandler } from "./utils/errorHandler.js";
import { connectDB } from "./db/db.js";

const app = express();

app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());
app.use(express.urlencoded());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send(`<h1>hi this is a test</h1>`);
});

try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect db", error.message);
}

app.listen(process.env.PORT, () => {
  console.log(`server is running at PORT:${process.env.PORT}`);
});
